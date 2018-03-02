import getRaven from '~/config/raven';

beforeEach(() => { jest.resetModules(); });

describe('getRaven', () => {
  it('should return a server instance on node', () => {
    const Raven = getRaven();
    expect(Raven).toBeDefined();
    const Raven2 = getRaven();
    expect(Raven2).toBe(Raven);
  });

  it('should return a client instance if window is defined', () => {
    global.window = true;
    const mockConfig = jest.fn(() => ({
      install: jest.fn(),
    }));
    jest.mock('raven-js', () => ({
      config: mockConfig,
    }));
    const Raven = getRaven();
    expect(Raven).toBeDefined();
    const Raven2 = getRaven();
    expect(Raven2).toBe(Raven);
  });
});
