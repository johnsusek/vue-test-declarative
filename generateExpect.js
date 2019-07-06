function generateExpect(expect) {
  let lines = [];

    // write expect line
  //     const msg = 'new message';
  //     expect(wrapper.text()).to.include(msg);
  if (expect['@_text'] === true) {
    let expectBinding = expect['@_v-bind:to-include'];
    lines.push(`    expect(wrapper.text()).toMatch(data.${expectBinding});`);
  }

  return lines;
}

module.exports = {
  generateExpect
}