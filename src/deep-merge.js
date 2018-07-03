function isSimple(obj) {
  const t = (typeof obj).trim().toLowerCase();
  if (obj === null || t === 'undefined' || t === 'boolean' || t === 'number' || t === 'string' || t === 'function') return true;
  return false;
}

function isArray(obj) {
  return obj && typeof obj.length === 'number' && typeof obj.map === 'function';
}

function isReplacer(a, b) {
  if (isSimple(b)) return true;
  if (isArray(b)) return true;
  if (b instanceof Date) return true;
  if (b && b.__REPLACE__) return true;
  if (isSimple(a)) return true;
  if (isArray(a)) return true;
  if (a instanceof Date) return true;
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
    if (obj[k] === undefined || k === '__REPLACE__') return o;
    return Object.assign(o, {[k]: sortObject(obj[k])});
  }, {});
}

function deepMerge(a, b) {
  // undefined override, return original
  if (b === undefined) return sortObject(a);

  // null override, use undefined
  if (b === null) return undefined;

  if (isReplacer(a, b)) return sortObject(b);

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