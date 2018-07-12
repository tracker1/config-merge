const deepMerge = require('../deep-merge');

/**
 * Wrap up the inheritance change for use with building Strings
 * @param {object} input Object to properties as last in chain to inherit to
 * @param {function} filter Method to filter out appropriate keys to work with
 * @param {function} getBase Method to retrieve appropriate base to inherit from
 * @returns {object} New/Merged object
 */
const mergeLang = (input, filter, getBase) => Object.entries(input)
    .filter(([k]) => !(/^[\_\.]/).test(k) && filter(k))
    .map(([k, v]) => [k.toLowerCase().replace(/^[\!]/,''), v])
    .map(([k, v]) => [k, deepMerge(getBase(k), v)])
    .reduce((o, [k,v]) => Object.assign(o, { [k]:v }), {});


/**
 * Does the input match a language name
 * @param {string} l
 * @returns {boolean} is two character language string
 */
const matchLang = l => /^[A-Za-z]{2}$/.test(l);

// matches language-locale string
/**
 * Does the input match a language-locale string
 * @param {string} l 
 * @returns {boolean} is a language-locale string
 */
const matchLoc = l => /^[A-Za-z]{2}\-[A-Za-z]{2}$/.test(l);

// gets language part of a string
/**
 * Get the language portion of a language/language-locale string
 * @param {string} l 
 * @returns {string} the language-portion of the string
 */
const lang = l => l.toLowerCase().trim().split('-')[0];

/**
 * gets the default value for the input item
 * @param {object} i 
 * @returns {object} the default property of the input, or an empty object
 */
const getDefault = i => i && (i.default || i['!default']) || {};


/**
 * creates a merged default value object
 * @param {object} a Left side to merge
 * @param {object} b Right side to merge
 * @returns {object} Merged object defining only a default property
 */
const mergeDefault = (a, b) => ({ default: deepMerge(getDefault(a), getDefault(b)) });

// exports all methods
module.exports = {
  mergeLang, matchLang, matchLoc, lang, getDefault, mergeDefault
};
