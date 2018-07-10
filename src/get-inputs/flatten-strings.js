import deepMerge from '../deep-merge';

const parse = (input, filter, getBase) => 
  Object.entries(input)
    .filter(([k]) => filter(k))
    .map(([k, v]) => [k.toLowerCase(), deepMerge(getBase(k.toLowerCase()), v)])
    .reduce((o, [k,v]) => Object.assign(o, { [k]:v }, {}));

const matchLang = l => /^[A-Za-z]{2}$/.test(l);
const matchLangLoc = l => /^[A-Za-z]{2}\-[A-Za-z]{2}$/.test(l);
const lang = l => l.toLowerCase().trim().split('-')[0];

const flattenStrings = (base, input) => {
  base = flattenBase(base);

  const result = {
    default: deepMerge(
      base && (base.default || base['!default']) || {},
      input && (input.default || input['!default']) || {},
    ),
  };

  const getBase = l => result[lang(l)] || result.default;

  // add/merge base languages
  Object.assign(result, parse(base, matchLang, _ => result.default));

  // add/merge base locales
  Object.assign(result, parse(base, matchLangLoc, getBase));

  // Add/merged  language-base options
  Object.assign(result, parse(input, matchLang, getBase));

  // Add/merge language-locale options
  Object.assign(result, parse(input, matchLangLoc, getBase));

  return result;
}

module.exports = { flattenStrings };
