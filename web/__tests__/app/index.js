/* eslint-disable global-require */

import path from 'path';
import request from 'supertest';

import createApp from '~/app';

describe('App integration', () => {
  let server;

  beforeAll(() => createApp(false).then((value) => { server = value.listen(0); }));

  afterAll(() => { server.close(); });

  it('should respond with 200 status for index and contain some french text', () =>
    request(server)
      .get('/')
      .expect(200)
      .expect(/>Salut le monde !<\/div>/));

  it('should response normally to non-next endpoint (e.g. /api)', () =>
    request(server)
      .get('/api')
      .expect(200)
      .expect('Api endpoint'));
});

describe('App unit', () => {
  it('should use dependencies', () => {
    jest.resetModules();
    const availableLanguages = ['fr'];
    const availableNamespaces = ['common'];
    require('../../src/config/i18n').availableLanguages = availableLanguages;
    require('../../src/config/i18n').availableNamespaces = availableNamespaces;
    const i18n = require('../../src/config/i18n').default;
    i18n.use.mockImplementation(() => i18n);
    i18n.init.mockImplementation(() => {});

    const mockBackend = 'backend';

    jest.mock('../../src/config/i18n');
    jest.mock('i18next-node-fs-backend', () => mockBackend);

    const LanguageDetector = 'LanguageDetector';
    const i18nextMiddleware = require('i18next-express-middleware').default;
    const handle = 'handle';
    const missingKeyHandler = 'missingKeyHandler';
    i18nextMiddleware.handle.mockImplementation(() => handle);
    i18nextMiddleware.missingKeyHandler.mockImplementation(() => missingKeyHandler);
    require('i18next-express-middleware').LanguageDetector = LanguageDetector;

    jest.mock('i18next-express-middleware');

    jest.mock('serve-favicon');
    const favicon = require('serve-favicon');
    favicon.mockImplementation(() => 'favicon');

    const dev = false;

    const app = require('~/app').default;
    const result = app(dev);
    expect(typeof result.then === 'function').toBe(true);

    expect(i18n.use).toHaveBeenCalledTimes(2);
    expect(i18n.use).toHaveBeenCalledWith(mockBackend);
    expect(i18n.use).toHaveBeenCalledWith(LanguageDetector);

    expect(i18n.init).toHaveBeenCalledTimes(1);
    expect(i18n.init.mock.calls[0][0]).toEqual({
      preload: availableLanguages,
      ns: availableNamespaces,
      backend: {
        loadPath: path.join(__dirname, '../../locales/{{lng}}/{{ns}}.json'),
        addPath: path.join(__dirname, '../../locales/{{lng}}/{{ns}}.missing.json'),
        jsonIndent: 2,
      },
    });
    const func = i18n.init.mock.calls[0][1];

    const mockApp = {
      prepare: jest.fn(() => ({
        then: jest.fn(fn => fn()),
      })),
    };

    jest.mock('next', () => jest.fn(() => mockApp));

    const next = require('next');

    const mockHandler = 'handler';
    jest.mock('../../src/routes', () => ({
      getRequestHandler: jest.fn(() => mockHandler),
    }));

    const passport = require('../../src/passport').default;
    jest.mock('../../src/passport');
    passport.mockImplementation(() => {});

    const express = require('express');
    const mockStatic = 'static';
    express.static.mockImplementation(() => mockStatic);
    const mockServer = {
      use: jest.fn(),
      get: jest.fn(),
      post: jest.fn(),
    };
    express.mockImplementation(() => mockServer);

    jest.mock('express');

    func();

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({ dev, dir: './src' });

    expect(favicon).toHaveBeenCalledTimes(1);
    expect(favicon).toHaveBeenCalledWith(path.join(
      __dirname,
      '../../src/static',
      'favicon.ico',
    ));

    expect(i18nextMiddleware.handle).toHaveBeenCalledTimes(1);
    expect(i18nextMiddleware.handle).toHaveBeenCalledWith(i18n);

    expect(mockServer.use).toHaveBeenCalledTimes(3);
    expect(mockServer.use).toHaveBeenCalledWith('favicon');
    expect(mockServer.use).toHaveBeenCalledWith(handle);
    expect(mockServer.use).toHaveBeenCalledWith('/locales', mockStatic);

    expect(passport).toHaveBeenCalledTimes(1);
    expect(passport).toHaveBeenCalledWith(mockServer);

    expect(mockServer.get).toHaveBeenCalledTimes(2);
    expect(mockServer.get.mock.calls[0][0]).toEqual('/api');
    const func2 = mockServer.get.mock.calls[0][1];
    const res = {};
    res.status = jest.fn(() => res);
    res.send = jest.fn(() => res);
    res.end = jest.fn();

    func2(undefined, res);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith('Api endpoint');
    expect(res.end).toHaveBeenCalledTimes(1);

    expect(mockServer.get).toHaveBeenCalledWith('*', mockHandler);

    expect(i18nextMiddleware.missingKeyHandler).toHaveBeenCalledTimes(1);
    expect(i18nextMiddleware.missingKeyHandler).toHaveBeenCalledWith(i18n);

    expect(mockServer.post).toHaveBeenCalledTimes(1);
    expect(mockServer.post).toHaveBeenCalledWith('/locales/add/:lng/:ns', missingKeyHandler);

    expect(result).resolves.toBe(mockServer);
  });
});
