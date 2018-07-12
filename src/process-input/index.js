const getInputs = require('../get-inputs');
const mergeTargets = require('./merge-targets');

async function processImports(inputDirectory) {
  const targets = await getInputs(inputDirectory);
  const merged = await mergeTargets(targets);
  return merged;
}

module.exports = processImports;