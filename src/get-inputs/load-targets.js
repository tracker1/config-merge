const path = require('path');
const fs = require('mz/fs');
const yaml = require('js-yaml');

const readYaml = async (name, filepath) => {
  try {
    return [name.replace(/\.(yml|yaml)$/, ''), yaml.safeLoad(await fs.readFile(filepath, 'utf8'))];
  } catch (err) {
    console.error(`Error reading yaml file: ${filepath}`, JSON.stringify(err, null, 4));
    throw Object.assign(err, { file: filepath });
  }
};

const getImageList = async directory => {
  try {
    return (await fs.readdir(directory))
      .filter(f => /\.(jpg|png|gif|svg)$/.test(f))
      .reduce((o, f) => Object.assign(o, { [path.basename(f)]: path.join(directory, f) }), {});
  } catch (error) {
    if (error.code === 'ENOENT' || error.message.includes('ENOENT')) return {};
    throw error;
  }
};

const getConfigFiles = async directory => {
  try {
    const files = (await fs.readdir(directory)).filter(f => /\.(yml|yaml)$/.test(f));
    return (await Promise.all(files.map(f => readYaml(f, path.join(directory, f))))).reduce(
      (o, [k, v]) => Object.assign(o, { [k]: v }),
      {}
    );
  } catch (error) {
    if (error.code === 'ENOENT' || error.message.includes('ENOENT')) return {};
    throw error;
  }
};

const loadConfig = async directory => {
  const [config, strings, images] = await Promise.all([
    getConfigFiles(directory),
    getConfigFiles(path.resolve(directory, 'strings')),
    getImageList(path.resolve(directory, 'images')),
  ]);
  return {
    directory,
    config,
    strings,
    images,
    name: path.basename(directory).replace(/^\!/, ''),
  };
};

async function loadTargets(inputDirectory) {
  const results = await fs.readdir(inputDirectory);
  const targets = await Promise.all(
    results.filter(r => !/^[_\.]/.test(r)).map(r => loadConfig(path.resolve(inputDirectory, r)))
  );
  return targets.reduce((o, t) => Object.assign(o, { [t.name]: t }), {});
}

module.exports = { loadTargets };
