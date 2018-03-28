import { availableLanguages } from '~/services/i18n';

const currentLanguage = (i18n) => {
  for (let i = 0; i < i18n.languages.length; i += 1) {
    const lng = i18n.languages[i];
    if (availableLanguages.indexOf(lng) !== -1) {
      return lng;
    }
  }
  return 'fr';
};

export default currentLanguage;
