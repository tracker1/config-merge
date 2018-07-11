const deepMerge = require('../deep-merge');

// repeatable key-merge
const parseStrings = (input, filter, getBase) => 
  Object.entries(input)
    .filter(([k]) => filter(k))
    .map(([k, v]) => [k.toLowerCase(), deepMerge(getBase(k.toLowerCase()), v)])
    .reduce((o, [k,v]) => Object.assign(o, { [k]:v }, {}));

// matches language string
const matchLang = l => /^[A-Za-z]{2}$/.test(l);

// matches language-locale string
const matchLoc = l => /^[A-Za-z]{2}\-[A-Za-z]{2}$/.test(l);

// gets language part of a string
const lang = l => l.toLowerCase().trim().split('-')[0];

// gets the default value for the input item
const getDefault = i => i && (i.default || i['!default']) || {};

// creates a merged default value object
const mergeDefault = (a, b) => ({ default: deepMerge(getDefault(a), getDefault(b)) });

// exports all methods
module.exports = {
  parseStrings, matchLang, matchLoc, lang, getDefault, mergeDefault
};
