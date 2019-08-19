#!/usr/bin/env node
let fs = require('fs');

let cwd = process.env.INIT_CWD;

if (fs.existsSync(`${cwd}/package.json`)) {
  try {
    let packageJson = JSON.parse(fs.readFileSync(`${cwd}/package.json`, 'utf8'));
    packageJson.scripts["test:declarative"] = "vue-test-declarative";
    fs.writeFileSync(`${cwd}/package.json`, JSON.stringify(packageJson, '', 2) + "\n");
  } catch (error) {
  }
}

console.log('test:declarative npm script added to package.json');

fs.mkdirSync(`${cwd}/tests/declarative`, { recursive: true });

console.log('tests/declarative directory created');
