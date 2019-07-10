function generateExpect(expect) {
  let lines = [];

  let subjectValue;

  let trimHtml = `.trim()
    .replace(/[\\n\\r]/g, '')
    .replace(/\\s+/g, ' ')
    .replace(/>\\s+</g, "><")`;

  if (expect.$['text'] !== undefined) {
    subjectValue = 'wrapper.text()';
  }
  else if (expect.$['html'] !== undefined) {
    subjectValue = `wrapper.html()${trimHtml}`;
  }
  else if (expect.$['text-of']) {
    subjectValue = `wrapper.find("${expect.$['text-of']}").text()`;
  }
  else if (expect.$['html-of']) {
    subjectValue = `wrapper.find("${expect.$['html-of']}").html()${trimHtml}`;
  }

  let expectedValue;
  let comparisonFn;

  if (expect.$['v-bind:to-match']) {
    comparisonFn = 'toMatch';
    expectedValue = 'context.' + expect.$['v-bind:to-match'];
  }
  else if (expect.$['to-match']) {
    comparisonFn = 'toMatch';
    if (expect['_'] && expect.$['to-match'] !== undefined) {
      // if this has a child cdata, parse it as a string to use as the expected value
      let escaped = squish(expect['_']);
      expectedValue = `"${escaped}"`;
    }
    else {
      // otherwise just use the value in the attr
      expectedValue = `"${expect.$['to-match']}"`
    }
  }
  else if (expect.$['v-bind:to-equal']) {
    comparisonFn = 'toEqual';
    expectedValue = 'context.' + expect.$['v-bind:to-equal'];
  }
  else if (expect.$['to-equal']) {
    comparisonFn = 'toEqual';
    // if this has a child cdata, parse it as a string to use as the expected value
    if (expect['_'] && expect.$['to-equal'] !== undefined) {
      let escaped = squish(expect['_']);
      expectedValue = `"${escaped}"`;
    }
    else {
      // otherwise just use the value in the attr
      expectedValue = `"${expect.$['to-equal']}"`
    }
  }

  lines.push(`    await Vue.nextTick();`)
  lines.push(`    expect(${subjectValue}).${comparisonFn}(${expectedValue});`);

  return lines;
}

function squish(val) {
  return val
          .trim()
          .replace(/[\n\r]/g, '') // squish newlines
          .replace(/\s+/g, ' ') // normalize spacing
          .replace(/\"/g, '\\"') // escape quotes
          .replace(/>\s+</g, "><"); // remove spaces between tags
}

module.exports = {
  generateExpect
}