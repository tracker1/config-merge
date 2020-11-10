const path = require('path');
const { promises: fs } = require('fs');
const getImage = require('../get-image');

const mkdir = async (p) => {
  try {
    await fs.mkdir(p);
  } catch (error) {
    if (error.code === 'EEXIST' || error.message.includes('EEXIST')) return; // EEXIST
    throw error;
  }
};

const loadImages = async (images) =>
  (await Promise.all(Object.values(images).map(getImage))).reduce(
    (o, i) => Object.assign(o, { [i.name]: i }),
    {}
  );

const loadMarkdown = async (files) => {
  var ret = {};
  for (const [k, v] of Object.entries(files)) {
    ret[k] = await fs.readFile(v, 'utf8');
  }
  return ret;
};

/**
 * Takes input target data and outputs it to a given path
 * @param {*} targets Input target data
 * @param {*} outputDirectory Path to output to
 * @return {Promise}
 */
async function processOutput(targets, outputDirectory) {
  for (const [k, v] of Object.entries(targets)) {
    const out = path.join(outputDirectory, k);
    await mkdir(out);
    const images = await loadImages(v.images);
    const markdown = await loadMarkdown(v.markdown);
    await Promise.all([
      fs.writeFile(path.join(out, 'config.json'), JSON.stringify(v.config, null, 2)),
      fs.writeFile(path.join(out, 'strings.json'), JSON.stringify(v.strings, null, 2)),
      fs.writeFile(path.join(out, 'markdown.json'), JSON.stringify(markdown, null, 2)),
      fs.writeFile(path.join(out, 'images.json'), JSON.stringify(images, null, 2)),
    ]);
  }
}

module.exports = { processOutput };
