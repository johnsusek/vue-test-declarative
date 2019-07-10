let { generateExpect } = require('./generateExpect');
let { generateTrigger } = require('./generateTrigger');

function generateIt(it) {
  let lines = [];

  lines.push(`  it('will ${it.$.will}', async () => {`);
  
  // TODO: move this out one level?
  lines.push(`    let options = { localVue, sync: false }`)
  lines.push(`    if (typeof store !== 'undefined') { options.store = store; }`);
  lines.push(`    let wrapper = mount(Component, options);`);

  // v-bind:props="props" = wrapper.setProps(props)
  let propsBinding = it.$['v-bind:props'];
  if (propsBinding) {
    lines.push(`    wrapper.setProps(context.${propsBinding});`);
  }

  // v-bind:data="data" = wrapper.setData(data)
  let dataBinding = it.$['v-bind:data'];
  if (dataBinding) {
    lines.push(`    wrapper.setData(context.${dataBinding});`);
  }

  // loop through each child of it.$$ and build either an expect line or a trigger line
  it.$$.forEach(child => {
    // console.log(child);

    switch (child['#name']) {
      case 'trigger':
        lines = lines.concat(generateTrigger(child));
        break;
      case 'expect':
        lines = lines.concat(generateExpect(child));
        break;
      default:
        console.warn('Unknown tag ' + child['#name']);
        break;
    }
  });

  // TODO: destroy()
  lines.push('  });\n');

  return lines;
}

module.exports = {
  generateIt
}