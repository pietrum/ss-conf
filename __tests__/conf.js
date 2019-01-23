const conf = require('../conf');

describe('ss-conf', () => {
  test('should expose as function', () => {
    expect(conf).toBeInstanceOf(Function);
  });

  it('should expose as object', () => {
    expect(conf()).toBeInstanceOf(Object);
  });

  test('should return undefined if key not exists', () => {
    expect(conf('undefined')).toBe(undefined);
  });

  it('should return merged data', () => {
    expect(conf('merge')).toEqual({
      name: 'merge',
      env: 'test',
    });
  });

  it('should return env data', () => {
    expect(conf('env')).toEqual({
      name: 'env',
      SS_CONF_TEST: 'active',
      SS_CONF_VOID: undefined,
    });
  });

  it('should return nested data', () => {
    expect(conf('nested.test')).toEqual({
      name: 'nested.test',
      env: 'test',
    });
  });

  it('should return nested single false value', () => {
    expect(conf('nested.false')).toBe(false);
  });

  it('should return undefined if nested key not exists', () => {
    expect(conf('nested.undefined.undefined.undefined')).toBe(undefined);
  });
});
