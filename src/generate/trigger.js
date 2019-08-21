function generateTrigger(trigger) {
  let lines = [];

  lines.push(`    wrapper.find('${trigger.$.selector}').trigger('${trigger.$.event}');`);
  lines.push(`    await Vue.nextTick();`)

  return lines;
}

module.exports = {
  generateTrigger
}