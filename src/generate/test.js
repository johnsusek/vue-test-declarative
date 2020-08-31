let { generateExpect } = require('./expect');
let { generateTrigger } = require('./trigger');
let { generateSet } = require('./set');

function generateTest(test) {
  let lines = [];

  lines.push(`  it('${test.$.name}', async () => {`);

  let propsBinding = test.$[':props'];
  let propsData = ''

  if (propsBinding) {
    propsData = `, propsData: context.props`
  }

  lines.push(`    let options = { localVue, sync: false ${propsData} , mocks: context.mocks}`)
  lines.push(`    if (typeof store !== 'undefined') { options.store = store; }`);
  lines.push(`    let wrapper = mount(Component, options);`);


  let dataBinding = test.$[':data'];
  if (dataBinding) {
    lines.push(`    wrapper.setData(context.${dataBinding});`);
  }

  test.$$.forEach(child => {
    lines = lines.concat(generateLines(child));
  });

  lines.push('  });\n');

  return lines;
}

function generateLines(child) {
  let lines = [];

  switch (child['#name']) {
    case 'trigger':
      lines = lines.concat(generateTrigger(child));
      break;
    case 'set':
      lines = lines.concat(generateSet(child));
      break;
    case 'expect':
      lines = lines.concat(generateExpect(child));
      break;
    default:
      console.warn('Unknown tag ' + child['#name']);
      break;
  }

  // For some reason, the first tag shows up in test.$$ and
  // the rest of the tags show up on the first child's $$
  // on tags with bare attributes like 'to-be-truthy'
  // This really seems like it could be a parser bug, but
  // go with it for now.
  // Basically all subsequent tags except the first one
  // show up as a child of the first, so we just recursively build the rules
  if (child.$$) {
    child.$$.forEach(gchild => {
      lines = lines.concat(generateLines(gchild));
    });
  }

  return lines;
}

module.exports = {
  generateTest
}