#!/usr/bin/env node

const minimist = require('minimist');
const { isDirectory } = require('./util');
const configMerge = require('./index');

const helpText = '\nUsage:n\    config-merge inputDirectory outputDirectory\n';

const checkDir = async ([name, path]) => {
  if (!(await isDirectory(path))) {
    return(`${name} '${path}' is not a directory.`);
  }
}

const checkDirs = async dirs => {
  const errors = (await Promise.all(Object.entries(dirs).map(checkDir))).filter(r => r);
  if (errors.length) {
    throw({ message: `\n${errors.join('\n')}\n${helpText}` });
    return true;
  }
  return false;
}

async function main(skip, processArgs) {
  if (skip) return;

  const argv = minimist(processArgs.slice(2));

  switch(true) {
    case argv.help:
    case argv['?']:
    case argv._.length != 2:
      console.log();
      return;
  }
  
  const [outputDirectory, inputDirectory] = argv._;
  
  if (await checkDirs({ inputDirectory, outputDirectory })) return;

  console.log(`PROCESSING: ${inputDirectory} ${outputDirectory}`);
  configMerge(inputDirectory, outputDirectory);
}

module.exports = { main, checkDir, checkDirs, helpText };

main(!!module.parent, process.argv).catch(err => {
  console.error(err.message);
  process.exit(1);
});