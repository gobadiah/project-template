import express from 'express';
import next from 'next';
import path from 'path';

import favicon from 'serve-favicon';
import fsBackend from 'i18next-node-fs-backend';
import i18nextMiddleware, { LanguageDetector } from 'i18next-express-middleware';

import i18n, { availableLanguages, availableNamespaces } from '~/config/i18n';
import routes from '~/routes';

import passport from '~/passport';

export default dev => new Promise(resolve => i18n.use(LanguageDetector)
  .use(fsBackend)
  .init({
    preload: availableLanguages,
    ns: availableNamespaces,
    backend: {
      loadPath: path.join(__dirname, '../../locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '../../locales/{{lng}}/{{ns}}.missing.json'),
      jsonIndent: 2,
    },
  }, () => {
    const app = next({ dev, dir: './src' });
    const handler = routes.getRequestHandler(app);

    app.prepare()
      .then(() => {
        const server = express();

        server.use(favicon(path.join(__dirname, '../static', 'favicon.ico')));

        server.use(i18nextMiddleware.handle(i18n));

        passport(server);

        server.get('/api', (req, res) => res.status(200).send('Api endpoint').end());

        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n));
        server.use('/locales', express.static(path.join(__dirname, '../../locales')));

        server.get('*', handler);

        resolve(server);
      });
  }));
