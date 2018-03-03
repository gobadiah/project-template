/* eslint-disable global-require */

const mockPassport = {
  use: jest.fn(),
  initialize: jest.fn(() => 'initialize'),
  authenticate: jest.fn(() => 'authenticate'),
};
jest.mock('passport', () => mockPassport);

const mockGoogle = jest.fn();
jest.mock('passport-google-oauth', () => ({
  OAuth2Strategy: mockGoogle,
}));

const mockFacebook = jest.fn();
jest.mock('passport-facebook', () => ({
  Strategy: mockFacebook,
}));

const goodPost = () => Promise.resolve({ data: { data: 5 } });
const err = new Error();
const badPost = () => Promise.reject(err);
const mockAxios = {
  post: jest.fn(goodPost),
};
jest.mock('axios', () => mockAxios);

beforeEach(() => {
  delete process.env.GOOGLE_CLIENT_ID;
  delete process.env.GOOGLE_CLIENT_SECRET;
  delete process.env.FACEBOOK_CLIENT_ID;
  delete process.env.FACEBOOK_CLIENT_SECRET;

  jest.resetModules();
  jest.clearAllMocks();

  mockAxios.post.mockImplementation(goodPost);
});

const runExpectations = (provider, args, done) => {
  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith(
    '/auth/provider',
    {
      uid: 7,
      provider,
      access_token: 'accessToken',
    },
    {
      baseUrl: 'http://127.0.0.1:8000',
      headers: {},
      withCredentials: true,
    },
  );
  expect(done).toHaveBeenCalledTimes(1);
  expect(done).toHaveBeenCalledWith(...args);
};

const setup = (provider, postImpl) => {
  process.env[`${provider.toUpperCase()}_CLIENT_ID`] = `${provider}-client-id`;
  process.env[`${provider.toUpperCase()}_CLIENT_SECRET`] = `${provider}-client-secret`;

  if (postImpl) {
    mockAxios.post.mockImplementation(postImpl);
  }
};

const testProvider = (provider, mockA, mockB) => {
  it(`should setup ${provider} if env var are present`, () => {
    setup(provider);

    const passport = require('~/passport').default;
    const config = require('~/passport/config').default;

    expect(mockB).not.toHaveBeenCalled();

    expect(mockA).toHaveBeenCalledTimes(1);
    expect(mockA.mock.calls[0]).toHaveLength(2);
    expect(mockA.mock.calls[0][0]).toEqual({
      clientID: `${provider}-client-id`,
      clientSecret: `${provider}-client-secret`,
      callbackURL: `${config.web}/auth/${provider}/callback`,
    });
    const func = mockA.mock.calls[0][1];
    const done = jest.fn();

    const server = {
      use: jest.fn(),
      get: jest.fn(),
    };

    passport(server);

    expect(mockPassport.initialize).toHaveBeenCalledTimes(1);
    expect(mockPassport.initialize).toHaveBeenCalledWith();

    expect(server.use).toHaveBeenCalledTimes(1);
    expect(server.use).toHaveBeenCalledWith('initialize');

    expect(mockPassport.authenticate).toHaveBeenCalledTimes(2);
    expect(mockPassport.authenticate).toHaveBeenCalledWith(provider, {
      session: false,
      scope: config[provider].scope,
    });
    expect(mockPassport.authenticate).toHaveBeenCalledWith(provider, {
      failureRedirect: '/signin',
      session: false,
    });

    expect(server.get).toHaveBeenCalledTimes(2);
    expect(server.get).toHaveBeenCalledWith(`/auth/${provider}`, 'authenticate');
    expect(server.get.mock.calls[1][0]).toEqual(`/auth/${provider}/callback`);
    expect(server.get.mock.calls[1][1]).toEqual('authenticate');
    const arg = server.get.mock.calls[1][2];
    const res = { redirect: jest.fn() };
    arg({}, res);
    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith('/');

    return func('accessToken', 'refreshToken', { id: 7 }, done)
      .then(() => {
        runExpectations(provider, [null, 5], done);
      });
  });
};

describe('Passport', () => {
  it('should do nothing when neither google of facebook are configured', () => {
    const passport = require('~/passport').default;
    const server = {};
    passport(server);

    expect(mockPassport.use).not.toHaveBeenCalled();
    expect(mockPassport.initialize).not.toHaveBeenCalled();
    expect(mockPassport.authenticate).not.toHaveBeenCalled();
    expect(mockGoogle).not.toHaveBeenCalled();
    expect(mockFacebook).not.toHaveBeenCalled();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  testProvider('google', mockGoogle, mockFacebook);

  it('should handle Google auth when axios rejects', () => {
    setup('google', badPost);

    // eslint-disable-next-line no-unused-expressions
    require('~/passport').default;

    const func = mockGoogle.mock.calls[0][1];
    const done = jest.fn();

    return func('accessToken', 'refreshToken', { id: 7 }, done)
      .then(() => {
        runExpectations('google', [err], done);
      });
  });

  testProvider('facebook', mockFacebook, mockGoogle);

  it('should handle Facebook auth when axios rejects', () => {
    setup('facebook', badPost);

    // eslint-disable-next-line no-unused-expressions
    require('~/passport').default;

    const func = mockFacebook.mock.calls[0][1];
    const done = jest.fn();

    return func('accessToken', 'refreshToken', { id: 7 }, done)
      .then(() => {
        runExpectations('facebook', [err], done);
      });
  });
});
