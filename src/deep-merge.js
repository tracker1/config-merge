function sortObject(obj) {
  if (typeof obj !== 'object') return obj;
  if (typeof obj.length === 'number' && typeof obj.map === 'function') return obj.map(sortObject);

  return Object.keys(obj).sort().reduce((o, k) => {
    if (obj[k] === undefined) return o;
    return Object.assign(o, {[k]: sortObject(obj[k])});
  }, {})
}

function deepMerge(a, b) {
  if (b === null) return undefined;
  if (b === undefined) return a;
  if (typeof b !== 'object') return b;
  if (typeof a !== 'object') return deepMerge({}, b);
  
  if (b.__REPLACE__) {
    return sortObject({ ...b, __REPLACE__: undefined });
  }

  return []
    .concat(...Object.keys(a))
    .concat(...Object.keys(b))
    .sort()
    .filter((v,i,a) => a.indexOf(v) === i)
    .reduce(
      (o, k) => Object.assign(o, {[k]: deepMerge(a[k], b[k])}), 
      {}
    );
}

module.exports = deepMerge;