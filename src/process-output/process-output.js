const path = require('path');
const fs = require('mz/fs');
const getImage = require('../get-image');

const mkdir = async p => {
  try {
    await fs.mkdir(p);
  } catch(error) {
    if (error.code === 'EEXIST' || error.message.includes('EEXIST')) return; // EEXIST
    throw error;
  }
}

const loadImages = async images => (await Promise.all(Object.values(images).map(getImage)))
  .reduce((o, i) => Object.assign(o, { [i.name]: i }), {});

async function processOutput(targets, outputDirectory) {
  for (const [k,v] of Object.entries(targets)) {
    const out = path.join(outputDirectory, k);
    await mkdir(out);
    const images = await loadImages(v.images);
    await Promise.all([
      fs.writeFile(path.join(out, 'config.json'), JSON.stringify(v.config, null, 2)),
      fs.writeFile(path.join(out, 'strings.json'), JSON.stringify(v.strings, null, 2)),
      fs.writeFile(path.join(out, 'images.json'), JSON.stringify(images, null, 2)),
    ]);
  }
}

module.exports = { processOutput };