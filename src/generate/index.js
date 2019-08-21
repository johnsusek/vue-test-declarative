// Loop through parsed xml and write out js
let generateTest = require('./test');

let head = `
/* THIS FILE IS AUTO-GENERATED, EDITS WILL BE OVERWRITTEN */

import Vue from 'vue';
import expect from 'expect';
import { config, mount, createLocalVue } from '@vue/test-utils';

config.stubs.transition = false;

`;

function generate(componentPath, parsed, script, localVue) {
  let lines = [];

  lines.push(`import Component from '${componentPath}';\n`);

  lines.push(localVue)

  lines.push(`describe('${componentPath}', () => {\n`);

  let tests;

  // parsed.tests.test might be either an object (single child) or array (multiple)
  // if single child, turn into array then foreach like usual
  if (Array.isArray(parsed.tests.test)) {
    tests = parsed.tests.test;
  }
  else {
    tests = [parsed.tests.test];
  }

  // loop through each 'its' to generate the case
  tests.forEach(test => {
    lines = lines.concat(generateTest.generateTest(test));
  });

  lines.push('});');

  return `${head}\n${script}\n\n${lines.join('\n')}\n\n`;
}

module.exports = {
  generate
}