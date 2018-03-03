beforeEach(() => jest.resetModules());

describe('Sentry', () => {
  describe('config', () => {
    it('should add sentry entry to general config', () => {
      const DSN = 'some-dsn';
      const publicDSN = 'some-public-dsn';
      process.env.SENTRY_DSN = DSN;
      process.env.SENTRY_PUBLIC_DSN = publicDSN;
      const { config } = require('../config');
      expect(config).toHaveProperty('sentry', {
        DSN,
        publicDSN,
      });
    });

    describe('getRaven', () => {
      beforeEach(() => {
        global.window = undefined;
        delete process.env.SENTRY_DSN;
        delete process.env.SENTRY_PUBLIC_DSN;
      });

      const testRaven = (message, browser) => {
        it(message, () => {
          const dsn = 'some-dsn';
          const module = browser ? 'raven-js' : 'raven';
          global.window = browser;
          const env = browser ? 'SENTRY_PUBLIC_DSN' : 'SENTRY_DSN';
          process.env[env] = dsn;
          const mockInstall = jest.fn();
          const mockConfig = jest.fn(() => ({
            install: mockInstall,
          }));
          jest.doMock(module, () => ({
            config: mockConfig,
          }));
          const { getRaven } = require('../config');
          const Raven = getRaven();
          expect(Raven).toBeDefined();
          const Raven2 = getRaven();
          expect(Raven2).toBe(Raven);

          expect(mockConfig).toHaveBeenCalledTimes(1);
          expect(mockConfig).toHaveBeenCalledWith(dsn);

          expect(mockInstall).toHaveBeenCalledTimes(1);
          expect(mockInstall).toHaveBeenCalledWith();
        });
      };

      testRaven('should return a server instance on node');
      testRaven('should return a client instance if window is defined', true);
    });
  });
});
