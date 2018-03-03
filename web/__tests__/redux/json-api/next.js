const axiosConfig = 'axiosConfig';
const readEndpoint = 'readEndpoint';
const mockSetAxiosConfig = jest.fn(() => axiosConfig);
const mockReadEndpoint = jest.fn(() => readEndpoint);
jest.mock('redux-json-api', () => ({
  reducer: jest.fn(() => ({})),
  setAxiosConfig: mockSetAxiosConfig,
  readEndpoint: mockReadEndpoint,
}));

let handleUnauthorized;

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

describe('HOC api', () => {
  it('should setup the axios config used by redux-json-api', () => {
    const { setupApi } = require('~/redux');

    const config = require('~/config').default;
    jest.mock('../../../src/config');
    const axios = 'axios';
    config.axios.mockImplementation(() => axios);

    const req = 5;
    const store = {
      dispatch: jest.fn(),
    };
    expect(setupApi({ req, store })).toEqual({});

    expect(config.axios).toHaveBeenCalledTimes(1);
    expect(config.axios).toHaveBeenCalledWith({ req });

    expect(mockSetAxiosConfig).toHaveBeenCalledTimes(1);
    expect(mockSetAxiosConfig).toHaveBeenCalledWith(axios);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(axiosConfig);
  });

  it('should getMe when on server and if access_token cookie is present', async () => {
    const { getMe } = require('~/redux');

    const res = true;
    const req = {
      cookies: {
        access_token: 'token',
      },
    };
    const store = require('~/redux/__fixtures__/store').default;
    const { user } = require('~/redux/__fixtures__/store');
    const id = 1;
    store.dispatch.mockImplementationOnce(() => Promise.resolve({
      body: {
        data: {
          id,
        },
      },
    }));

    jest.mock('../../../src/redux/auth');

    const { signin } = require('~/redux/auth');

    await expect(getMe({
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

  it('should call handleUnauthorized if axios throws', async () => {
    const { getMe } = require('~/redux');

    const res = true;
    const req = {
      cookies: {
        access_token: 'token',
      },
    };
    const asPath = '/';
    const needsLogin = true;
    const store = require('~/redux/__fixtures__/store').default;
    const err = new Error('yes');
    store.dispatch.mockImplementationOnce(() => Promise.reject(err));

    await expect(getMe({
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

  it('should call currentUser if there is no access_token', () => {
    const { getMe } = require('~/redux');
    const { currentUser } = require('~/redux');
    const store = require('~/redux/__fixtures__/store').default;
    const { user } = require('~/redux/__fixtures__/store');
    jest.mock('../../../src/redux/selectors');

    expect(getMe({
      store,
      req: {
        cookies: {
        },
      },
    })).toEqual(user);

    expect(store.getState).toHaveBeenCalledTimes(1);
    expect(currentUser).toHaveBeenCalledTimes(1);
    expect(currentUser).toHaveBeenCalledWith(store.getState());
  });
});

describe('handleUnauthorized', () => {
  it('should redirect on server for status 401 when needsLogin', () => {
    ({ handleUnauthorized } = require('~/redux'));
    const res = {
      redirect: jest.fn(),
    };
    const asPath = '/some-page';
    handleUnauthorized({
      res,
      asPath,
      needsLogin: true,
      err: {
        response: {
          status: 401,
        },
      },
    });

    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith(302, `/signin?returnUrl=${asPath}`);
  });

  it('should redirect on client for status 401 when needsLogin', () => {
    jest.mock('../../../src/routes');
    ({ handleUnauthorized } = require('~/redux'));
    const { Router } = require('~/routes');

    const asPath = '/some-page';
    handleUnauthorized({
      asPath,
      needsLogin: true,
      err: {
        response: {
          status: 401,
        },
      },
    });

    expect(Router.replace).toHaveBeenCalledTimes(1);
    expect(Router.replace).toHaveBeenCalledWith(`/signin?returnUrl=${asPath}`);
  });

  it('should do nothing for 401 error an needsLogin false', () => {
    jest.mock('../../../src/routes');
    ({ handleUnauthorized } = require('~/redux'));
    const { Router } = require('~/routes');
    const res = {
      redirect: jest.fn(),
    };
    handleUnauthorized({
      err: {
        response: {
          status: 401,
        },
      },
      res,
      needsLogin: false,
    });
    expect(res.redirect).not.toHaveBeenCalled();
    expect(Router.replace).not.toHaveBeenCalled();
  });

  it('should rethrow if this is not a 401 http error', () => {
    const err = new Error('oups');
    ({ handleUnauthorized } = require('~/redux'));
    expect(() => handleUnauthorized({ err })).toThrow(err);
  });
});
