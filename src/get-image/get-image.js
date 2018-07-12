const { basename } = require('path');
const fs = require('mz/fs');
const sizeOf = require('image-size');

/**
 * @typedef {Object} ImageDetail
 * @property {string} name The original filename (without path)
 * @property {number} width Width of the image
 * @property {number} height Height of the image
 * @property {string} type Type of the image, file extension (ex: 'svg')
 * @property {string} data Base64 encoded image file
 */

/**
 * Returns details for an image based on the input path.
 * @param {string} imagePath Path to the image to retrieve
 * @return {ImageDetail} Detail for the image specified
 */
async function getImage(imagePath) {
  const img = await fs.readFile(imagePath);
  const {width, height, type} = sizeOf(img);

  return {
    width, height, type,
    name: basename(imagePath),
    data: img.toString('base64'),
  };
}

module.exports = { getImage };