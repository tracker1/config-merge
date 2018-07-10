const { deepMerge, sortObject } = require('./deep-merge');

describe('deep-merge/deepMerge', () => {
  it('will deep merge objects', () => {
    const base = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
    };
    const nest = { b: { d: 4, e: 5 } };
    const expected = {
      a: 1,
      b: {
        c: 2,
        d: 4,
        e: 5,
      },
    };

    expect(deepMerge(base, nest)).toEqual(expected);
  });

  it('will return undefined for null override', () => {
    expect(deepMerge(0, null)).toBeUndefined();
  });

  it('will return a when b is undefined', () => {
    expect(deepMerge(0, undefined)).toStrictEqual(0);
  });

  it('will return b when not an object', () => {
    expect(deepMerge({}, 1)).toStrictEqual(1);
  });

  it('will return clonded Date, when b is a Date', () => {
    const b = new Date();
    const r = deepMerge({}, b);
    expect(b).toEqual(r);
    expect(b === r).toBeFalsy();
  })

  it('will return b when a is simple', () => {
    const b = { a: 1, b: { c: 2 }};
    expect(deepMerge(0, b)).toEqual(b);
  });

  it('will return b when a is an array', () => {
    const b = { a: 1, b: { c: 2 }};
    expect(deepMerge([], b)).toEqual(b);
  });

  it('will return b when a is a Date', () => {
    const b = { a: 1, b: { c: 2 }};
    expect(deepMerge(new Date(), b)).toEqual(b);
  });

  it('will override arrays', () => {
    const a = [1, 2, 3];
    const b = [4, 5, 6];
    expect(deepMerge(a, b)).toEqual(b);
  })

  it('will clear null overrides', () => {
    const a = { a: { b: {} } };
    const b = { a: { b: null } };
    const exp = { a: {} };
    expect(deepMerge(a, b)).toEqual(exp);
  });

  it('will replace an object when __REPLACE__ is set and truthy', () => {
    const a = { a: 1, b: { c: 1 }};
    const b = { c: 1, b: { __REPLACE__: true, d: 2 }};
    const exp = { a: 1, c: 1, b: { d: 2 }};
    expect(deepMerge(a, b)).toEqual(exp);
  });
});

describe('deep-merge/sortObject', () => {
  it('will return primatives as-is', () => {
    expect(sortObject(0)).toStrictEqual(0);
  });

  it('will map arrays', () => {
    const a = {
      length: 1,
      map: () => 1234,
    };
    expect(sortObject(a)).toStrictEqual(1234)
  });

  it('will clone dates', () => {
    const d1 = new Date();
    const d2 = sortObject(d1);
    expect(d1).toEqual(d2);
    expect(d1 === d2).toBeFalsy();
  });
});