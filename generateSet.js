function generateSet(trigger) {
  let lines = [];

  lines.push(`    wrapper.find('${trigger.$.selector}').setValue('${trigger.$.value}');`);

  return lines;
}

module.exports = {
  generateSet
}