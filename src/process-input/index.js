const getInputs = require('../get-inputs');
const mergeTargets = require('./merge-targets');

/**
 * Processes a given config directory
 * @param {string} inputDirectory Directory to process the input for
 * @return {Promise<object>}
 */
async function processImports(inputDirectory) {
  const targets = await getInputs(inputDirectory);
  const merged = await mergeTargets(targets);
  return merged;
}

module.exports = processImports;