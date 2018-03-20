beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe('Redux', () => {
  describe('json-api', () => {
    describe('auth', () => {
      describe('signin', () => {
        it('should make a post request and then dispatch two actions', async () => {
          jest.mock('axios');
          jest.mock('redux-json-api');
          jest.mock('../../auth');

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

          const signinAction = require('../../auth').signin;
          const config = require('~/config').default;
          const { signin } = require('../..');

          const dispatch = jest.fn();
          const data = {};

          await expect(signin(dispatch)(data)).resolves.toBeUndefined();

          expect(axios.post).toHaveBeenCalledTimes(1);
          expect(axios.post).toHaveBeenCalledWith(
            '/auth/signin',
            data,
            config.axios(),
          );

          expect(hydrateStore).toHaveBeenCalledTimes(1);
          expect(hydrateStore).toHaveBeenCalledWith(result.data);

          expect(dispatch).toHaveBeenCalledTimes(2);
          expect(dispatch).toHaveBeenCalledWith('hydrateStore');

          expect(signinAction).toHaveBeenCalledTimes(1);
          expect(signinAction).toHaveBeenCalledWith(id);

          expect(dispatch).toHaveBeenCalledWith('signin');
        });

        it('should should call handleFormErrors when an error is thrown', async () => {
          jest.mock('axios');
          jest.mock('../../form');

          const axios = require('axios');
          const { handleFormErrors } = require('~/redux/form');
          const data = {};
          const error = {};
          const dispatch = jest.fn();
          axios.post.mockImplementationOnce(() => Promise.reject(error));
          const { signin } = require('../..');
          await expect(signin(dispatch)(data)).resolves.toBeUndefined();
          expect(handleFormErrors).toHaveBeenCalled();
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

          const signinAction = require('../../auth').signin;
          const config = require('~/config').default;
          const { register } = require('../..');

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
            config.axios({
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

          expect(signinAction).toHaveBeenCalledTimes(1);
          expect(signinAction).toHaveBeenCalledWith(id);

          expect(dispatch).toHaveBeenCalledWith('signin');
        });

        it('should should call handleFormErrors when an error is thrown', async () => {
          jest.mock('axios');
          jest.mock('../../form');

          const axios = require('axios');
          const { handleFormErrors } = require('~/redux/form');
          const data = {};
          const error = {};
          const dispatch = jest.fn();
          axios.post.mockImplementationOnce(() => Promise.reject(error));
          const { register } = require('../..');
          await expect(register(dispatch)(data)).resolves.toBeUndefined();
          expect(handleFormErrors).toHaveBeenCalled();
        });
      });
    });
  });
});
