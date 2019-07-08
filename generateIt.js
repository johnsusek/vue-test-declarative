let generateExpect = require('./generateExpect');

function generateIt(it) {
  let lines = [];

  lines.push(`  it('will ${it['@_will']}', async () => {`);
  
  // TODO: move this out one level?
  lines.push(`    let wrapper = mount(Component, { localVue, sync: false });`);

  // v-bind:props="props" = wrapper.setProps(props)
  let propsBinding = it['@_v-bind:props'];
  if (propsBinding) {
    lines.push(`    wrapper.setProps(context.${propsBinding});`);
  }

  // v-bind:data="data" = wrapper.setData(data)
  let dataBinding = it['@_v-bind:data'];
  if (dataBinding) {
    lines.push(`    wrapper.setData(context.${dataBinding});`);
  }

  let expects;

  // it.expect might be either an object (single child) or array (multiple)
  // if single child, turn into array then foreach like usual
  if (Array.isArray(it.expect)) {
    expects = it.expect;
  }
  else {
    expects = [it.expect];
  }

  // loop through each 'expects' to generate the case
  expects.forEach(expect => {
    lines = lines.concat(generateExpect.generateExpect(expect));
  });

  // TODO: destroy()
  lines.push('  });\n');

  return lines;
}

module.exports = {
  generateIt
}