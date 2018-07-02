function deepMerge(a, b) {
  if (b === null) return undefined;
  if (b === undefined) return a;
  if (typeof b !== 'object') return b;
  if (typeof a !== 'object') return deepMerge({}, b);
  
  if (b.__REPLACE__) {
    const ret = {...b};
    delete ret.__REPLACE__;
    return ret;
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