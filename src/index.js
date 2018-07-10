// merge-config inputDirectory outputDirectory

const getInputs = require('./get-inputs');

async function processConfig(inputDirectory, outputDirectory) {
  const targets = getInputs(inputDirectory);
}

module.exports = processConfig;
