import deepMerge from '../deep-merge';

const parse = (input, filter, getBase) => 
  Object.entries(input)
    .filter(([k]) => filter(k))
    .map(([k, v]) => [k.toLowerCase(), deepMerge(getBase(k.toLowerCase()), v)])
    .reduce((o, [k,v]) => Object.assign(o, { [k]:v }, {}));

const matchLang = l => /^[A-Za-z]{2}$/.test(l);
const matchLangLoc = l => /^[A-Za-z]{2}\-[A-Za-z]{2}$/.test(l);
const lang = l => l.toLowerCase().trim().split('-')[0];

const getDefault = i => i && (i.default || i['!default']) || {};
const mergeDefault = (a, b) => ({ default: deepMerge(getDefault(a), getDefault(b)) });

const flattenStrings = (base, input) => {
  // get an object with a default from base and input
  const result = mergeDefault(base, input);

  // gets the base language result or the default/fallback
  const getBase = l => result[lang(l)] || result.default;
  const getBaseLoc = l => deepMerge(getBase(l), base[l] || undefined);

  // add/merge base languages
  Object.assign(result, parse(base, matchLang, _ => result.default));

  // add/merge base locales
  Object.assign(result, parse(base, matchLangLoc, getBase));

  // Add/merged  language-base options
  Object.assign(result, parse(input, matchLang, getBase));

  // Add/merge language-locale options
  Object.assign(result, parse(input, matchLangLoc, getBaseLoc));

  return result;
}

module.exports = { flattenStrings };
