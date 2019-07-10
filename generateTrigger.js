function generateTrigger(trigger) {
  let lines = [];

  lines.push(`    wrapper.find('${trigger.$.selector}').trigger('${trigger.$.event}');`);

  return lines;
}

module.exports = {
  generateTrigger
}