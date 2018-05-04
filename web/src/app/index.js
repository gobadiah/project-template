import { URL } from 'url';
import cookieParser from 'cookie-parser';
import express from 'express';
import favicon from 'serve-favicon';
import fsBackend from 'i18next-node-fs-backend';
import i18nextMiddleware, { LanguageDetector } from 'i18next-express-middleware';
import next from 'next';
import proxy from 'express-http-proxy';

import config from '~/config';
import i18n, { availableLanguages, availableNamespaces } from '~/services/i18n';
import passport from '~/services/passport';
import path from 'path';
import routes from '~/routes';

export const options = {
  preload: availableLanguages,
  ns: availableNamespaces,
  backend: {
    loadPath: path.join(__dirname, '../../locales/{{lng}}/{{ns}}.json'),
    addPath: path.join(__dirname, '../../locales/{{lng}}/{{ns}}.missing.json'),
    jsonIndent: 2,
  },
};

export default dev => new Promise(resolve => i18n.use(LanguageDetector)
  .use(fsBackend)
  .init(options, () => {
    const app = next({ dev, dir: './src' });
    const handler = routes.getRequestHandler(app);

    app.prepare()
      .then(() => {
        const server = express();

        server.use('/api', proxy(config.api));

        server.use(favicon(path.join(__dirname, '../static', 'favicon.ico')));

        server.use(cookieParser());

        server.use(i18nextMiddleware.handle(i18n));

        passport(server);

        server.get('/api', (req, res) => res.status(200).send('Api endpoint').end());

        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n));
        server.use('/locales', express.static(path.join(__dirname, '../../locales')));

        server.get('/signout', (req, res) => {
          res.clearCookie('access_token');
          const target = (
            !req.get('Referrer') ||
            (new URL(req.get('Referrer'))).pathname === '/signout'
          ) ? '/' : req.get('Referrer');
          res.redirect(302, target);
        });

        server.get('*', handler);

        resolve(server);
      });
  }));
