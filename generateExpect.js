function generateExpect(expect) {
  let lines = [];

  let subjectValue;

  let trimHtml = `.trim()
    .replace(/[\\n\\r]/g, '')
    .replace(/\\s+/g, ' ')
    .replace(/>\\s+</g, "><")`;

  if (expect['@_text'] === true) {
    subjectValue = 'wrapper.text()';
  }
  else if (expect['@_html'] === true) {
    subjectValue = `wrapper.html()${trimHtml}`;
  }
  else if (expect['@_text-of']) {
    subjectValue = `wrapper.find("${expect['@_text-of']}").text()`;
  }
  else if (expect['@_html-of']) {
    subjectValue = `wrapper.find("${expect['@_html-of']}").html()${trimHtml}`;
  }

  let expectedValue;
  let comparisonFn;

  if (expect['@_v-bind:to-match']) {
    comparisonFn = 'toMatch';
    expectedValue = 'context.' + expect['@_v-bind:to-match'];
  }
  else if (expect['@_to-match']) {
    comparisonFn = 'toMatch';
    if (expect['#text'] && expect['@_to-match'] === true) {
      // if this has a child cdata, parse it as a string to use as the expected value
      let escaped = squish(expect['#text']);
      expectedValue = `"${escaped}"`;
    }
    else {
      // otherwise just use the value in the attr
      expectedValue = `"${expect['@_to-match']}"`
    }
  }
  else if (expect['@_v-bind:to-equal']) {
    comparisonFn = 'toEqual';
    expectedValue = 'context.' + expect['@_v-bind:to-equal'];
  }
  else if (expect['@_to-equal']) {
    comparisonFn = 'toEqual';
    // if this has a child cdata, parse it as a string to use as the expected value
    if (expect['#text'] && expect['@_to-equal'] === true) {
      let escaped = squish(expect['#text']);
      expectedValue = `"${escaped}"`;
    }
    else {
      // otherwise just use the value in the attr
      expectedValue = `"${expect['@_to-equal']}"`
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