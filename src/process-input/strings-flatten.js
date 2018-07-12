const deepMerge = require('../deep-merge');

const { mergeLang, matchLang, matchLoc, lang, mergeDefault } = require('./strings-merge-lang');

/**
 * Takes a base/default string configuration collection, and merges up with a deployment string configuration collection.
 * @param {object} base Base/Default string configuration collection
 * @param {object} input Deployment target string configuration collection
 */
const flattenStrings = (base, input) => {
  /**
   * For the "default" a key of "default" then "!default" is checked.
   * 
   * Inheritance is as follows:
   * 
   *    - base.default
   *    - input.default
   *    - base.language
   *    - base.language-location *
   *    - input.language
   *    - input.language-location *
   * 
   * Language is two character language code (en, es, ...)
   * Location is two character country code (us, es, mx, fr, ...)
   * 
   * * - language-location only
   */

  // get an object with a default from base and input
  const result = mergeDefault(base, input);

  // gets the base language result or the default/fallback
  const getBaseLang = l => result[lang(l)] || result.default;

  // is language-locale and has a base language-locale to inherit from
  const baseLoc = l => matchLoc(l) && base && base[l]

  // gets the merged base for an input language-locale
  const getBaseLoc = l => 
    baseLoc(l) ? 
      [
        result[lang(l)] || result.default, 
        base && base[l], 
        input && input[lang(l)],
      ].reduce(deepMerge, {}) : getBaseLang(l);

  // add/merge base languages
  Object.assign(result, mergeLang(base, matchLang, _ => result.default));

  // add/merge base language-locale options
  Object.assign(result, mergeLang(base, matchLoc, getBaseLang));

  // add/merge input languages
  Object.assign(result, mergeLang(input, matchLang, getBaseLang));

  // add/merge input language-locale options
  Object.assign(result, mergeLang(input, matchLoc, getBaseLoc));

  // return merged/flattened result
  return result;
}

module.exports = { flattenStrings };
