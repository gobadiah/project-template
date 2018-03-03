beforeEach(() => { jest.resetModules(); });

describe('Sentry', () => {
  it('should render nothing if no publicDSN available', () => {
    jest.mock('../../src/config/index', () => ({
      sentry: { publicDSN: undefined },
    }));
    const Sentry = require('~/tags/sentry').default;
    expect(Sentry()).toEqual(null);
  });

  it('should render nothing if config is dev', () => {
    jest.mock('../../src/config/index', () => ({
      sentry: { publicDSN: 'something' },
      dev: true,
    }));
    const Sentry = require('~/tags/sentry').default;
    expect(Sentry()).toEqual(null);
  });

  it('should render something if publicDSN is defined and config is not dev', () => {
    jest.mock('../../src/config/index', () => ({
      sentry: { publicDSN: 'hello' },
      dev: false,
    }));
    const Sentry = require('~/tags/sentry').default;
    expect(Sentry()).not.toEqual(null);
  });
});
