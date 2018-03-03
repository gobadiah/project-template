beforeEach(() => {
  delete process.env.GOOGLE_CLIENT_ID;
  delete process.env.GOOGLE_CLIENT_SECRET;
  delete process.env.FACEBOOK_CLIENT_ID;
  delete process.env.FACEBOOK_CLIENT_SECRET;

  jest.resetModules();
});

const testConfig = (provider) => {
  const upper = provider.toUpperCase();
  it(`has a ${provider} property based on ${upper}_CLIENT_ID and ${upper}_CLIENT_SECRET`, () => {
    const clientId = `${provider}-client-id`;
    const clientSecret = `${provider}-client-secret`;
    process.env[`${upper}_CLIENT_ID`] = clientId;
    process.env[`${upper}_CLIENT_SECRET`] = clientSecret;
    const config = require('~/passport/config').default;
    expect(config[provider].clientId).toEqual(clientId);
    expect(config[provider].clientSecret).toEqual(clientSecret);
  });
};

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

  testConfig('google');
  testConfig('facebook');
});
