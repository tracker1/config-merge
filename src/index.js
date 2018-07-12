const processInput = require('./process-input');
const processOutput = require('./process-output');

/**
 * Process the input config directory and output build to another path
 * @param {string} inputDirectory Path to the config directory to process
 * @param {*} outputDirectory Path to output the transformed configuration
 * @return {Promise}
 */
async function processConfig(inputDirectory, outputDirectory) {
  return processOutput(await processInput(inputDirectory), outputDirectory);
}

module.exports = processConfig;
