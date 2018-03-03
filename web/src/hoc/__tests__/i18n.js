import i18n from '~/config/i18n';
import getI18nInitialProps from '~/hoc/i18n';

describe('getI18nInitialProps', () => {
  it('should return an empty object when req is undefined', () => getI18nInitialProps({})
    .then((props) => {
      expect(props).toEqual({});
    }));

  it('should return an non-empty object when req is defined', () => {
    i18n.languages = ['fr'];
    i18n.language = 'fr';
    const req = {
      i18n,
    };
    return getI18nInitialProps({ req, namespaces: ['common'] })
      .then((props) => {
        expect(props).toEqual({
          i18n,
          initialI18nStore: {
            fr: {
              common: {},
            },
          },
          initialLanguage: 'fr',
        });
      });
  });
});
