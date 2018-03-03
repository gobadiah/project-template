beforeEach(() => { jest.resetModules(); });

const mock = (mockPublicDSN, mockDev) => jest.mock('../config', () => ({
  config: {
    dev: mockDev,
    sentry: {
      publicDSN: mockPublicDSN,
    },
  },
}));

describe('Sentry', () => {
  it('should render nothing if no publicDSN available', () => {
    mock(undefined, false);
    const Sentry = require('../tag').default;
    expect(Sentry()).toEqual(null);
  });

  it('should render nothing if config is dev', () => {
    mock('something', true);
    const Sentry = require('../tag').default;
    expect(Sentry()).toEqual(null);
  });

  it('should render something if publicDSN is defined and config is not dev', () => {
    mock('something', false);
    const Sentry = require('../tag').default;
    expect(Sentry()).not.toEqual(null);
  });
});
