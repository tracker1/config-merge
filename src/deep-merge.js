function isSimple(obj) {
  const t = (typeof obj).trim().toLowerCase();
  if (obj === null || t === 'undefined' || t === 'boolean' || t === 'number' || t === 'string') return true;
  return false;
}

function sortObject(obj) {
  // simple value type, return as is
  if (isSimple(obj)) return obj;

  // array, return map
  if (typeof obj.length === 'number' && typeof obj.map === 'function') return obj.map(sortObject);

  // date, return clone
  if (obj instanceof Date) return new Date(obj.valueOf()); // clone dates

  // return sorted object
  return Object.keys(obj).sort().reduce((o, k) => {
    if (obj[k] === undefined) return o;
    return Object.assign(o, {[k]: sortObject(obj[k])});
  }, {});
}

function deepMerge(a, b) {
  // null override, use undefined
  if (b === null) return undefined;

  // undefined override, return original
  if (b === undefined) return a;

  // override is simple, use b
  if (typeof b !== 'object') return b;

  // a isn't an object, or b has replace
  if (typeof a !== 'object' || b.hasOwnProperty('__REPLACE__')) {
    return sortObject({ ...b, __REPLACE__: undefined });
  }

  // array/array-like?
  if (typeof b.length === 'number' && typeof b.map === 'function') return sortObject(b);

  // return sorted object
  return []
    .concat(...Object.keys(a))
    .concat(...Object.keys(b))
    .sort()
    .filter((v,i,a) => a.indexOf(v) === i)
    .reduce(
      (o, k) => {
        const v = deepMerge(a[k], b[k]);
        return v === undefined ? o : Object.assign(o, {[k]: v});
      },
      {}
    );
}

module.exports = { deepMerge, sortObject };