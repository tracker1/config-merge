// merge-config inputDirectory outputDirectory

const deepMerge = require('@tracker1/deep-merge');
const { flattenStrings } = require('./strings-flatten');

const rollupConfig = (base, target) => {
  // console.log('rollupConfig\n', { strings: target.strings });
  return {
    name: target.name,
    config: deepMerge(base && base.config, target && target.config),
    images: deepMerge(base && base.images, target && target.images),
    markdown: deepMerge(base && base.markdown, target && target.markdown),
    strings: flattenStrings((base && base.strings) || {}, (target && target.strings) || {}),
  };
};

const getRollup = (targets, filter, getBase) =>
  Object.entries(targets)
    .filter(([k]) => !/^\.\_/.test(k)) // exclude directories starting with . or _
    .map(([k, v]) => [k.replace(/^\!/, ''), v]) // remove ! prefix on key/name
    .filter(([k]) => filter(k)) // run configured filter
    .map(([k, v]) => [k, rollupConfig(getBase(k), v)])
    .reduce((o, [k, v]) => Object.assign(o, { [k]: v }), {});

async function mergeTargets(targets) {
  const emptyDefault = { strings: {}, images: {}, config: {} };
  const result = { default: targets.default || emptyDefault };

  result.default.strings = flattenStrings({}, result.default.strings);

  const isFirstLevel = (k) => k !== 'default' && k.indexOf('.') === -1;
  const isSecondLevel = (k) => k.indexOf('.') > 0;
  const getSecondBase = (k) => result[k.split('.')[0]] || result.default;

  Object.assign(
    result,
    getRollup(targets, isFirstLevel, (_) => result.default || {})
  );
  Object.assign(result, getRollup(targets, isSecondLevel, getSecondBase));

  return result;
}

module.exports = mergeTargets;
