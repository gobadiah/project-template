import * as matchers from 'jest-immutable-matchers';
import { Map } from 'immutable';

import { defaultState } from '../duck';

const someAuthState = Map({ userId: 8 });

beforeEach(() => {
  jest.unmock('redux-actions');
  jest.resetModules();
  jest.addMatchers(matchers);
});

describe('Auth reducer', () => {
  it('should combine actions signin and signout', () => {
    const mockHandleActions = jest.fn(() => 98);
    const mockCombineActions = jest.fn(() => 99);

    jest.mock('redux-actions', () => ({
      handleActions: mockHandleActions,
      combineActions: mockCombineActions,
      createActions: jest.fn(x => x),
    }));
    // eslint-disable-next-line no-unused-expressions
    require('../duck').default;
    expect(mockHandleActions).toHaveBeenCalledTimes(1);
    expect(mockHandleActions.mock.calls[0][0]).toHaveProperty('99');
    const next = mockHandleActions.mock.calls[0][0]['99'];
    expect(next(someAuthState, { payload: { userId: 4 } }).equals(Map({
      userId: 4,
    }))).toBe(true);
    expect(mockHandleActions.mock.calls[0][1].equals(defaultState)).toBe(true);
  });

  it('should have a default state', () => {
    const auth = require('../duck').default;
    const initialState = auth(undefined, { type: 'notype' });
    expect(initialState.equals(defaultState)).toBe(true);
  });

  it('should handle signin action', () => {
    const auth = require('../duck').default;
    const signin = require('../duck').signinAction;
    const action = signin(5);
    const state = auth(undefined, action);
    expect(state).toEqualImmutable(Map({
      userId: 5,
    }));
    expect(state).toEqualImmutable(Map({
      userId: 5,
    }));
  });

  it('should handle signout action', () => {
    const auth = require('../duck').default;
    const { signout } = require('../duck');
    const state = auth(someAuthState, signout());
    expect(state.equals(defaultState)).toBe(true);
  });
});

describe('Redux', () => {
  describe('json-api', () => {
    describe('auth', () => {
      describe('signin', () => {
        it('should make a post request and then dispatch two actions', async () => {
          jest.mock('axios');
          jest.mock('redux-json-api');
          jest.mock('nprogress');
          jest.mock('../../routes', () => ({
            Router: {
              pushRoute: jest.fn(),
              router: {
                query: {
                  returnUrl: '/home',
                },
              },
            },
          }));

          const axios = require('axios');
          const id = 6;
          const result = {
            data: {
              data: {
                id,
              },
            },
          };
          axios.post.mockImplementationOnce(() => Promise.resolve(result));

          const { hydrateStore } = require('redux-json-api');
          hydrateStore.mockImplementationOnce(() => 'hydrateStore');

          const { Router } = require('~/routes');
          const { config } = require('~/services/axios');
          const { signin } = require('../duck');

          const dispatch = jest.fn();
          const data = {};

          await expect(signin(dispatch)(data)).resolves.toBeUndefined();

          expect(axios.post).toHaveBeenCalledTimes(1);
          expect(axios.post).toHaveBeenCalledWith(
            '/auth/signin',
            data,
            config(),
          );

          expect(Router.pushRoute).toHaveBeenCalledTimes(1);
          expect(Router.pushRoute).toHaveBeenCalledWith(Router.router.query.returnUrl, undefined);

          expect(hydrateStore).toHaveBeenCalledTimes(1);
          expect(hydrateStore).toHaveBeenCalledWith(result.data);

          expect(dispatch).toHaveBeenCalledTimes(2);
          expect(dispatch).toHaveBeenCalledWith('hydrateStore');

          expect(dispatch).toHaveBeenCalledWith({
            type: 'web/auth/SIGNIN',
            payload: {
              userId: 6,
            },
          });
        });

        it('should make a post request and then dispatch two actions / no returnUrl', async () => {
          jest.mock('axios');
          jest.mock('redux-json-api');
          jest.mock('nprogress');
          jest.mock('../../routes', () => ({
            Router: {
              pushRoute: jest.fn(),
              router: {
                query: {
                },
              },
            },
          }));

          const axios = require('axios');
          const id = 6;
          const result = {
            data: {
              data: {
                id,
              },
            },
          };
          axios.post.mockImplementationOnce(() => Promise.resolve(result));

          const { hydrateStore } = require('redux-json-api');
          hydrateStore.mockImplementationOnce(() => 'hydrateStore');

          const { Router } = require('~/routes');
          const { config } = require('~/services/axios');
          const { signin } = require('../duck');

          const dispatch = jest.fn();
          const data = {};

          await expect(signin(dispatch)(data)).resolves.toBeUndefined();

          expect(axios.post).toHaveBeenCalledTimes(1);
          expect(axios.post).toHaveBeenCalledWith(
            '/auth/signin',
            data,
            config(),
          );

          expect(Router.pushRoute).toHaveBeenCalledTimes(1);
          expect(Router.pushRoute).toHaveBeenCalledWith('/', undefined);

          expect(hydrateStore).toHaveBeenCalledTimes(1);
          expect(hydrateStore).toHaveBeenCalledWith(result.data);

          expect(dispatch).toHaveBeenCalledTimes(2);
          expect(dispatch).toHaveBeenCalledWith('hydrateStore');

          expect(dispatch).toHaveBeenCalledWith({
            type: 'web/auth/SIGNIN',
            payload: {
              userId: 6,
            },
          });
        });

        it('should should call errorHandler when an error is thrown', async () => {
          jest.mock('axios');
          jest.mock('../../utils/forms');

          const axios = require('axios');
          const { errorHandler } = require('~/utils/forms');
          const data = {};
          const error = {};
          const dispatch = jest.fn();
          axios.post.mockImplementationOnce(() => Promise.reject(error));
          const { signin } = require('..');
          await expect(signin(dispatch)(data)).resolves.toBeUndefined();
          expect(errorHandler).toHaveBeenCalled();
        });
      });

      describe('register', () => {
        it('should make a post request and then dispatch two actions', async () => {
          jest.mock('axios');
          jest.mock('redux-json-api');

          const axios = require('axios');
          const id = 6;
          const result = {
            data: {
              data: {
                id,
              },
            },
          };
          axios.post.mockImplementationOnce(() => Promise.resolve(result));

          const { hydrateStore } = require('redux-json-api');
          hydrateStore.mockImplementationOnce(() => 'hydrateStore');

          const { config } = require('~/services/axios');
          const { register } = require('..');

          const dispatch = jest.fn();
          const data = {};

          await expect(register(dispatch)(data)).resolves.toBeUndefined();

          expect(axios.post).toHaveBeenCalledTimes(1);
          expect(axios.post).toHaveBeenCalledWith(
            '/auth/register',
            {
              data: {
                type: 'users',
                attributes: data,
              },
            },
            config({
              headers: {
                'Content-Type': 'application/vnd.api+json',
                Accept: 'application/vnd.api+json',
              },
            }),
          );

          expect(hydrateStore).toHaveBeenCalledTimes(1);
          expect(hydrateStore).toHaveBeenCalledWith(result.data);

          expect(dispatch).toHaveBeenCalledTimes(2);
          expect(dispatch).toHaveBeenCalledWith('hydrateStore');
          expect(dispatch).toHaveBeenCalledWith({
            type: 'web/auth/SIGNIN',
            payload: {
              userId: 6,
            },
          });
        });

        it('should should call errorHandler when an error is thrown', async () => {
          jest.mock('axios');
          jest.mock('../../utils/forms');

          const axios = require('axios');
          const { errorHandler } = require('~/utils/forms');
          const data = {};
          const error = {};
          const dispatch = jest.fn();
          axios.post.mockImplementationOnce(() => Promise.reject(error));
          const { register } = require('..');
          await expect(register(dispatch)(data)).resolves.toBeUndefined();
          expect(errorHandler).toHaveBeenCalled();
        });
      });
    });
  });
});
