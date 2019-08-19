// Loop through parsed xml and write out js
let generateIt = require('./generateIt');

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

  let its;

  // parsed.tests.it might be either an object (single child) or array (multiple)
  // if single child, turn into array then foreach like usual
  if (Array.isArray(parsed.tests.it)) {
    its = parsed.tests.it;
  }
  else {
    its = [parsed.tests.it];
  }

  // loop through each 'its' to generate the case
  its.forEach(it => {
    lines = lines.concat(generateIt.generateIt(it));
  });

  lines.push('});');

  return `${head}\n${script}\n\n${lines.join('\n')}\n\n`;
}

module.exports = {
  generate
}