import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import axios from 'axios';

import config from './config';

const google = config.google.clientId && config.google.clientSecret;
const facebook = config.facebook.clientId && config.facebook.clientSecret;

if (google) {
  passport.use(new GoogleStrategy(
    {
      clientID: config.google.clientId,
      clientSecret: config.google.clientSecret,
      callbackURL: `${config.web}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      const data = {
        uid: profile.id,
        provider: 'google',
        access_token: accessToken,
      };
      return axios.post('/auth/provider', data, config.axios())
        .then(result => done(null, result.data.data))
        .catch(err => done(err));
    },
  ));
}

if (facebook) {
  passport.use(new FacebookStrategy(
    {
      clientID: config.facebook.clientId,
      clientSecret: config.facebook.clientSecret,
      callbackURL: `${config.web}/auth/facebook/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      const data = {
        uid: profile.id,
        provider: 'facebook',
        access_token: accessToken,
      };
      return axios.post('/auth/provider', data, config.axios())
        .then(result => done(null, result.data.data))
        .catch(err => done(err));
    },
  ));
}

export default (server) => {
  if (!google && !facebook) {
    return;
  }
  server.use(passport.initialize());

  if (google) {
    server.get(
      '/auth/google',
      passport.authenticate(
        'google',
        {
          session: false,
          scope: config.google.scope,
        },
      ),
    );

    server.get(
      '/auth/google/callback',
      passport.authenticate(
        'google',
        {
          failureRedirect: '/signin',
          session: false,
        },
      ),
      (req, res) => res.redirect('/'),
    );
  }

  if (facebook) {
    server.get('/auth/facebook', passport.authenticate('facebook', {
      session: false,
      scope: config.facebook.scope,
    }));
    server.get(
      '/auth/facebook/callback',
      passport.authenticate(
        'facebook',
        {
          session: false,
          successRedirect: '/',
          failureRedirect: '/signin',
        },
      ),
    );
  }
};
