#!/usr/bin/env node
let glob = require('glob');
let fs = require('fs');
let parser = require('../src/parse');
let { setup } = require('../src/setup');
let generator = require('../src/generate');
let { spawn } = require('child_process');
let uuidv4 = require('uuid/v4');

// Make sure ran from project root since we assume this
if (!fs.existsSync('package.json')){
  quit("Error: Must run from project root.");
}

// Load config if it exists
let config = {};

if (fs.existsSync('vuetest.config.json')) {
  let configJson = fs.readFileSync('vuetest.config.json', 'utf8');
  try {
    config = JSON.parse(configJson);    
  } catch (error) {
    quit("Error parsing vuetest.config.json");
  }
}

// 1) Pre-process xml to change e.g. :props="props" -> v-bind:props="props"
// 2) Parse xml to js data structure
// 3) Loop over data stucture and generate js test case
// 4) Write test case to spec file

let cwd = process.cwd();
let workingDir = cwd + '/tests/declarative';

if (config.testsPath) {
  workingDir = cwd + '/' + config.testsPath;
}

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
    quit('No .vuetest files found.');
  }
})

function createSetupFile() {
  if (!fs.existsSync(workingDir)){
    quit(`Working directory ${workingDir} not found.`);
  }

  try {
    fs.writeFileSync(`${workingDir}/generated-setup.js`, setup.trim());
  } catch (error) {
    quit("Error writing setup file: ", error);
  }
}

function processFile(file) {
  parser.parse(file, (parsedXml, script = '') => {
    let componentPath = parsedXml.tests.$.for;

    if (!componentPath) {
      console.error("Error: Test lacks a `for` attribute.");
      return;
    }
  
    let localVueSetup = "";
  
    // If there is a vuetest.setup.js file, use those contents
    if (fs.existsSync(`${workingDir}/vuetest.setup.js`)) {
      let setupContents = fs.readFileSync(`${workingDir}/vuetest.setup.js`);

      // If the setup file doesn't define localVue, add it to there
      if (!setupContents.includes('createLocalVue')) {
        localVueSetup += `let localVue = createLocalVue();\n`;
      }

      localVueSetup += setupContents;
    }
    else {
      localVueSetup = `let localVue = createLocalVue();\n`;
    }
  
    let generated = generator.generate(componentPath, parsedXml, script, localVueSetup);
    
    if (!fs.existsSync(workingDir)){
      fs.mkdirSync(workingDir);
    }
    
    try {
      fs.writeFileSync(`${workingDir}/${uuidv4()}.vuetest.spec.js`, generated.trim());
    } catch (error) {
      console.error("Error writing spec file: ", error);
      process.exit(1);
    }
  });
}

function findWebpackConfig() {
  let configLocation

  if (config.webpackConfigPath) {
    configLocation = config.webpackConfigPath;
  }
  else if (fs.existsSync('./node_modules/@vue/cli-service/webpack.config.js')) {
    configLocation = './node_modules/@vue/cli-service/webpack.config.js';
  }
  else if (fs.existsSync('./build/webpack.base.conf.js')) {
    configLocation = './build/webpack.base.conf.js';
  }

  return configLocation;
}

// TODO: add config file so users can customize webpack config location
function runTests() {    
  let webpackConfig = findWebpackConfig();

  if (!webpackConfig) {
    quit("Error: Could not find webpack config file.")
  }

  try {
    let child = spawn('./node_modules/.bin/mochapack', 
      [
        '--require',
        workingDir + '/generated-setup.js',
        '--webpack-config', 
        webpackConfig,
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
    console.error("Error: Problem spawning mochapack.")
    cleanup();
  }
}

// remove generated tests
function cleanup() {
  let files = glob.sync(workingDir + '/*.vuetest.spec.js', options);
  
  files.forEach(file => {
    fs.unlinkSync(file);
  })

  fs.unlinkSync(workingDir + '/generated-setup.js');
}

function quit(message, code = 1) {
  console.log(`[vue-test-declarative] ${message}\n`);
  cleanup();
  process.exit(code);
}
