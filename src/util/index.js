const util = require('util');
const fs = require('fs');

const stat = util.promisify(fs.stat);

const isDirectory = async dir => {
  try {
    const s = await stat(dir);
    return s.isDirectory();
  } catch(err) {
    return false;
  }
}

const getDirFiles = async path => {
  
};

module.exports = { isDirectory };