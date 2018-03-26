jest.mock('i18next-xhr-backend');

beforeEach(() => {
  global.process.browser = false;
  jest.resetModules();
});

describe('I18n', () => {
  describe('getInitialProps', () => {
    it('should be a property', () => {
      const i18n = require('..').default;
      expect(i18n).toHaveProperty('getInitialProps');
    });

    it('should return three props', () => {
      const i18n = require('..').default;
      i18n.languages = ['fr', 'en'];
      i18n.language = 'fr';
      const req = {
        i18n,
      };
      const result = i18n.getInitialProps(req);
      expect(result).toEqual({
        i18n,
        initialI18nStore: {
          fr: {
            common: {},
          },
          en: {
            common: {},
          },
        },
        initialLanguage: 'fr',
      });
      expect(i18n.toJSON()).toBe(null);
    });

    it('should handle when namespace is given as an array', () => {
      const i18n = require('..').default;
      i18n.languages = ['fr', 'en'];
      i18n.language = 'fr';
      const req = {
        i18n,
      };
      const namespaces = ['common', 'index'];
      const result = i18n.getInitialProps(req, namespaces);
      expect(result).toEqual({
        i18n,
        initialI18nStore: {
          fr: {
            common: {},
            index: {},
          },
          en: {
            common: {},
            index: {},
          },
        },
        initialLanguage: 'fr',
      });
      expect(i18n.toJSON()).toBe(null);
    });

    it('should use the resource store when available', () => {
      const i18n = require('..').default;
      i18n.languages = ['fr', 'en'];
      i18n.language = 'fr';
      i18n.services.resourceStore.data = {
        fr: {
          common: {
            hello: 'world',
          },
        },
        en: {
        },
      };
      const req = {
        i18n,
      };
      const result = i18n.getInitialProps(req);
      expect(result).toEqual({
        i18n,
        initialI18nStore: {
          fr: {
            common: {
              hello: 'world',
            },
          },
          en: {
            common: {},
          },
        },
        initialLanguage: 'fr',
      });
      expect(i18n.toJSON()).toBe(null);
    });
  });

  it('should initialize differently when process.browser is true', () => {
    global.process.browser = true;

    const browserI18n = require('..').default;
    expect(browserI18n.options.caches).toEqual(['localStorage', 'cookie']);
  });

  it('should not call init if already initialized', () => {
    jest.mock('i18next', () => ({
      init: jest.fn(),
      isInitialized: true,
    }));
    const i18n = require('..').default;
    expect(i18n.init).not.toHaveBeenCalled();
  });
});
