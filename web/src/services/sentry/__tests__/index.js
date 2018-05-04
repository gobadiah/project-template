beforeEach(() => jest.resetModules());

describe('Sentry', () => {
  describe('index', () => {
    it('should export Sentry and capture', () => {
      const { Sentry, capture } = require('..');
      expect(Sentry).toBeDefined();
      expect(capture).toBeDefined();
    });
  });

  describe('capture', () => {
    const setup = (dev, DSN, err) => {
      const mockDev = dev;
      const mockDSN = DSN;
      const mockCaptureException = jest.fn();
      jest.mock('../config', () => ({
        config: {
          dev: mockDev,
          sentry: {
            DSN: mockDSN,
          },
        },
        getRaven: jest.fn(() => ({
          captureException: mockCaptureException,
        })),
      }));
      const { capture } = require('..');
      capture(err);
      return { captureException: mockCaptureException };
    };

    const testNotCalled = (message, dev, DSN, err) => {
      it(message, () => {
        const { captureException } = setup(dev, DSN, err);
        expect(captureException).not.toHaveBeenCalled();
      });
    };

    it('should capture if err, DSN is defined and not in dev environment', () => {
      const err = new Error();
      const { captureException } = setup(false, 'some-dsn', err);
      expect(captureException).toHaveBeenCalledTimes(1);
      expect(captureException).toHaveBeenCalledWith(err);
    });

    testNotCalled('should not capture if err is not defined', false, 'some-dsn');
    testNotCalled('should not capture if dev is true', true, 'some-dsn', new Error());
    testNotCalled('should not capture if DSN is undefined', false, undefined, new Error());
  });
});
