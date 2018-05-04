import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import axios from 'axios';

import { config as axiosConfig } from '~/services/axios';

import config from './config';

const google = config.google.clientId && config.google.clientSecret;
const facebook = config.facebook.clientId && config.facebook.clientSecret;

const getConfig = provider => ({
  clientID: config[provider].clientId,
  clientSecret: config[provider].clientSecret,
  callbackURL: `${config.web}/auth/${provider}/callback`,
});

const callback = provider => (accessToken, refreshToken, profile, done) => {
  const data = {
    uid: profile.id,
    provider,
    access_token: accessToken,
  };
  return axios.post('/auth/provider', data, axiosConfig())
    .then(result => done(null, result.data.data))
    .catch(err => done(err));
};

if (google) {
  passport.use(new GoogleStrategy(
    getConfig('google'),
    callback('google'),
  ));
}

if (facebook) {
  passport.use(new FacebookStrategy(
    getConfig('facebook'),
    callback('facebook'),
  ));
}

const setupProvider = (server, provider) => {
  server.get(
    `/auth/${provider}`,
    passport.authenticate(
      provider,
      {
        session: false,
        scope: config[provider].scope,
      },
    ),
  );

  server.get(
    `/auth/${provider}/callback`,
    passport.authenticate(
      provider,
      {
        failureRedirect: '/signin',
        session: false,
      },
    ),
    (req, res) => res.redirect('/'),
  );
};

export default (server) => {
  if (!google && !facebook) {
    return;
  }
  server.use(passport.initialize());

  if (google) {
    setupProvider(server, 'google');
  }

  if (facebook) {
    setupProvider(server, 'facebook');
  }
};
