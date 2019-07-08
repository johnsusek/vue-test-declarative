#!/usr/bin/env node
let glob = require('glob');
let fs = require('fs');
let parser = require('../parse');
let { setup } = require('../setup');
let generator = require('../generate');
let { spawn } = require('child_process');
let uuidv4 = require('uuid/v4');

// Make sure ran from project root since we assume this
if (!fs.existsSync('package.json')){
  console.error("Error: Must run from project root.");
  process.exit(1);
}

// 1) Pre-process xml to change e.g. :props="props" -> v-bind:props="props"
// 2) Parse xml to js data structure
// 3) Loop over data stucture and generate js test case
// 4) Write test case to spec file

let cwd = process.cwd();
let workingDir = cwd + '/.vue-test-declarative-generated';

let options = {
  ignore: ["**/node_modules/**", "./node_modules/**"]
}

// 1) Find all .vuetest files in the project 
glob(cwd + '/**/*.vuetest', options, (err, files) => {
  createSetupFile();

  // 2) Process each and write them to a temp test directory
  files.forEach(file => {
    processFile(file)
  })

  // 3) Use mocha-webpack to run those tests
  if (files.length) {
    runTests();
  }
  else {
    console.log('No .vuetest files found.');
  }
})

function createSetupFile() {
  if (!fs.existsSync(workingDir)){
    fs.mkdirSync(workingDir);
  }

  try {
    fs.writeFileSync(`${workingDir}/setup.js`, setup.trim());
  } catch (error) {
    console.error("Error writing setup file: ", error);
    process.exit(1);
  }
}

function processFile(file) {
  let [parsedXml, script] = parser.parse(file);

  let componentPath = parsedXml.tests['@_for'];

  if (!componentPath) {
    console.error("Error: Test lacks a `for` attribute.");
    return;
  }

  let generated = generator.generate(componentPath, parsedXml, script);

  if (!fs.existsSync(workingDir)){
    fs.mkdirSync(workingDir);
  }
  
  try {
    fs.writeFileSync(`${workingDir}/${uuidv4()}.vuetest.spec.js`, generated.trim());
  } catch (error) {
    console.error("Error writing spec file: ", error);
    process.exit(1);
  }
}

// TODO: add config file so users can customize webpack config location
function runTests() {
  try {
    let child = spawn('./node_modules/.bin/mocha-webpack', 
      [
        '--require',
        workingDir + '/setup.js',
        '--webpack-config', 
        './node_modules/@vue/cli-service/webpack.config.js',
        workingDir + '/*.vuetest.spec.js'
      ],
      {
        stdio: 'inherit' 
      }
    ); 
    
    child.on('close', (code) => {
      cleanup();
    });    
  } catch (error) {
    console.error("Error: Problem spawning mocha-webpack.")
    cleanup();
  }
}

// remove generated tests
function cleanup() {
  glob(workingDir + '/*.vuetest.spec.js', options, (err, files) => {
    files.forEach(file => {
      fs.unlinkSync(file);
    })

    fs.unlinkSync(workingDir + '/setup.js');

    if (fs.existsSync(workingDir)){
      fs.rmdirSync(workingDir);
    }    
  });
}
