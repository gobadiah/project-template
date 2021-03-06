import currentLanguage from '../current-language';

describe('Utils', () => {
  describe('currentLanguage', () => {
    it('should find the current language giving a i18n object', () => {
      const i18n = {
        languages: ['en-GB', 'en'],
      };
      expect(currentLanguage(i18n)).toEqual('en');
    });

    it('should return fr if language is not available', () => {
      const i18n = {
        languages: ['de'],
      };
      expect(currentLanguage(i18n)).toEqual('fr');
    });
  });
});
