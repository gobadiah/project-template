/* eslint-disable global-require */

beforeEach(() => {
  delete process.env.GOOGLE_CLIENT_ID;
  delete process.env.GOOGLE_CLIENT_SECRET;
  delete process.env.FACEBOOK_CLIENT_ID;
  delete process.env.FACEBOOK_CLIENT_SECRET;

  jest.resetModules();
});

describe('Passport config', () => {
  it('should add google and facebook keys to general config', () => {
    const config = require('~/passport/config').default;
    expect(config).toHaveProperty('google.clientId');
    expect(config).toHaveProperty('google.clientSecret');
    expect(config).toHaveProperty('google.scope', [
      'profile',
      'email',
      'https://www.googleapis.com/auth/user.birthday.read',
      'https://www.googleapis.com/auth/user.emails.read',
      'https://www.googleapis.com/auth/user.phonenumbers.read',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ]);
    expect(config).toHaveProperty('facebook.clientId');
    expect(config).toHaveProperty('facebook.clientSecret');
  });

  it('has a google property based on GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET', () => {
    process.env.GOOGLE_CLIENT_ID = 'google-client-id';
    process.env.GOOGLE_CLIENT_SECRET = 'google-client-secret';
    const config = require('~/passport/config').default;
    expect(config.google.clientId).toEqual('google-client-id');
    expect(config.google.clientSecret).toEqual('google-client-secret');
  });

  it('has a facebook property based on FACEBOOK_CLIENT_ID and FACEBOOK_CLIENT_SECRET', () => {
    process.env.FACEBOOK_CLIENT_ID = 'facebook-client-id';
    process.env.FACEBOOK_CLIENT_SECRET = 'facebook-client-secret';
    const config = require('~/passport/config').default;
    expect(config.facebook.clientId).toEqual('facebook-client-id');
    expect(config.facebook.clientSecret).toEqual('facebook-client-secret');
  });
});
