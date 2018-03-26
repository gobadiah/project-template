const axiosConfig = 'axiosConfig';
const readEndpoint = 'readEndpoint';
const mockSetAxiosConfig = jest.fn(() => axiosConfig);
const mockReadEndpoint = jest.fn(() => readEndpoint);
jest.mock('redux-json-api', () => ({
  reducer: jest.fn(() => ({})),
  setAxiosConfig: mockSetAxiosConfig,
  readEndpoint: mockReadEndpoint,
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

describe('currentUser', () => {
  it('should make some function calls', async () => {
    const currentUser = require('../current-user').default;

    const res = true;
    const req = {
      cookies: {
        access_token: 'token',
      },
    };
    const store = require('~/services/redux/__fixtures__/store').default;
    const { user } = require('~/services/redux/__fixtures__/store');
    const id = 1;
    store.dispatch.mockImplementationOnce(() => Promise.resolve({
      body: {
        data: {
          id,
        },
      },
    }));

    jest.mock('../../auth');

    const { signin } = require('../../auth');

    await expect(currentUser({
      store,
      res,
      req,
    })).resolves.toEqual({ user });

    expect(mockReadEndpoint).toHaveBeenCalledTimes(1);
    expect(mockReadEndpoint).toHaveBeenCalledWith('/users/me');

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(readEndpoint);

    expect(signin).toHaveBeenCalledTimes(1);
    expect(signin).toHaveBeenCalledWith(id);
  });

  it('should call unauthorizedHandler if axios throws', async () => {
    const currentUser = require('../current-user').default;

    const res = true;
    const req = {
      cookies: {
        access_token: 'token',
      },
    };
    const asPath = '/';
    const needsLogin = true;
    const store = require('~/services/redux/__fixtures__/store').default;
    const err = new Error('yes');
    store.dispatch.mockImplementationOnce(() => Promise.reject(err));

    await expect(currentUser({
      store,
      res,
      req,
      asPath,
      needsLogin,
    })).rejects.toEqual(err);

    expect(mockReadEndpoint).toHaveBeenCalledTimes(1);
    expect(mockReadEndpoint).toHaveBeenCalledWith('/users/me');

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(readEndpoint);
  });

  it('should call currentUserSelector if there is no access_token', () => {
    jest.dontMock('../../auth');
    jest.mock('../../auth/selectors');
    const currentUser = require('../current-user').default;
    const store = require('~/services/redux/__fixtures__/store').default;
    const { user } = require('~/services/redux/__fixtures__/store');
    const currentUserSelector = require('~/auth').currentUser;

    expect(currentUser({
      store,
      req: {
        cookies: {
        },
      },
    })).toEqual(user);

    expect(store.getState).toHaveBeenCalledTimes(1);
    expect(currentUserSelector).toHaveBeenCalledTimes(1);
    expect(currentUserSelector).toHaveBeenCalledWith(store.getState());
  });
});
