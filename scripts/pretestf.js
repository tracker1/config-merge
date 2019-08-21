const path = require('path');
const mkdirp = require('mkdirp-promise');
const rimraf = require('rimraf-promise');

async function main(skip) {
  if (skip) return;

  const output = path.join(__dirname, '../temp/functional-output');
  await rimraf(output);
  await mkdirp(output);
}

main(!!module.parent);
