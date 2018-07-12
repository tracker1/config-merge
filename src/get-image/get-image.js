const { basename, extname } = require('path')
const fs = require('mz/fs');
const { sizeOf } = require('./size-of');

async function getImage(imagePath) {
  const isSVG = extname(imagePath).toLowerCase() === '.svg';
  const [dimensions, img] = await Promise.all([
    sizeOf(imagePath),
    fs.readFile(imagePath)
  ]);

  return {
    name: basename(imagePath),
    ...dimensions,
    data: img.toString('base64'),
  };
}

module.exports = { getImage };