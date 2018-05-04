beforeEach(() => jest.resetModules());

const testEnvConfig = (property, e, val) => {
  const upper = property.toUpperCase();
  const env = e || upper;
  it(`has a ${property} property base on ${env}`, () => {
    const value = val || 'some-value';
    process.env[env] = value;
    const config = require('~/config').default;
    expect(config[property]).toEqual(value);
  });
};

describe('Config', () => {
  it('should have a set of keys', () => {
    const config = require('~/config').default;
    expect(Object.keys(config)).toEqual([
      'api',
      'web',
      'port',
      'dev',
    ]);
    expect(config.api).toEqual('http://127.0.0.1:8000');
    expect(config.web).toEqual('http://127.0.0.1:3000');
    expect(config.port).toEqual(3000);
    expect(config.dev).toEqual(true);
    expect(config.port).toEqual(3000);
  });

  testEnvConfig('api', 'API_URL');
  testEnvConfig('web', 'WEB_URL');
  testEnvConfig('port', 'PORT', 3123);

  it('has a api property when on browser uses web', () => {
    process.browser = true;
    const config = require('~/config').default;
    expect(config.api).toEqual(`${config.web}/api`);
  });

  it('has a dev property based on NODE_ENV', () => {
    const config = require('~/config').default;
    expect(config.dev).toEqual(true);
  });
});
