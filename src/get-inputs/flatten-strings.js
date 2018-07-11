const deepMerge = require('../deep-merge');

const { parseStrings, matchLang, matchLoc, lang, getDefault, mergeDefault } = require('../util/string-utils');

const flattenStrings = (base, input) => {
  // get an object with a default from base and input
  const result = mergeDefault(base, input);

  // gets the base language result or the default/fallback
  const getBaseLang = l => result[lang(l)] || result.default;
  const getBaseLoc = l => deepMerge(getBase(l), base && base[l] || undefined);

  // add/merge base languages
  Object.assign(result, parseStrings(base, matchLang, _ => result.default));

  // add/merge base locales
  Object.assign(result, parseStrings(base, matchLoc, getBaseLang));

  // Add/merged  language-base options
  Object.assign(result, parseStrings(input, matchLang, getBaseLang));

  // Add/merge language-locale options
  Object.assign(result, parseStrings(input, matchLoc, getBaseLoc));

  return result;
}

module.exports = { flattenStrings };
