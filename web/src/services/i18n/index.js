import i18n from 'i18next';
import backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import moment from 'moment';

export const availableLanguages = ['fr', 'en'];
export const availableNamespaces = ['common', 'index'];

const detection = {
  order: ['querystring', 'cookie', 'localStorage', 'navigator', 'header'],

  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',

  caches: false,
};

const options = {
  fallbackLng: 'fr',
  load: 'languageOnly',

  ns: availableNamespaces,
  defaultNS: 'common',

  debug: false,

  react: {
    wait: true,
  },

  saveMissing: true,

  detection,

  interpolation: {
    escapeValue: false,
  },
};

if (process.browser) {
  i18n.use(backend)
    .use(LanguageDetector);
  options.caches = ['localStorage', 'cookie'];
  options.backend = {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    addPath: '/locales/add/{{lng}}/{{ns}}',
  };
}

if (!i18n.isInitialized) {
  i18n.init(options);
}

i18n.on('languageChanged', lng => moment.locale(lng));

i18n.getInitialProps = (req, nss) => {
  let namespaces = nss;
  if (typeof namespaces === 'undefined') {
    namespaces = i18n.options.defaultNS;
  }
  if (typeof namespaces === 'string') {
    namespaces = [namespaces];
  }

  req.i18n.toJSON = () => null;

  const initialI18nStore = {};
  req.i18n.languages.forEach((l) => {
    initialI18nStore[l] = {};
    namespaces.forEach((ns) => {
      initialI18nStore[l][ns] = req.i18n.services.resourceStore.data[l] ?
        req.i18n.services.resourceStore.data[l][ns] || {} : {};
    });
  });

  return {
    i18n: req.i18n,
    initialI18nStore,
    initialLanguage: req.i18n.language,
  };
};

export default i18n;
