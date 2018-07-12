const processInput = require('./process-input');
const processOutput = require('./process-output');

module.exports = async (inputDirectory, outputDirectory) => {
  processOutput(await processInput(inputDirectory), outputDirectory);
};
