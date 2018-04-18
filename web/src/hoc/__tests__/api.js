/* eslint-disable no-unused-expressions */

jest.mock('redux-json-api', () => ({
  setAxiosConfig: jest.fn(x => x),
}));
jest.mock('../../services/axios', () => ({
  config: jest.fn(x => x || 'config'),
}));

const setup = ({ req } = { req: undefined }) => {
  const { setAxiosConfig } = require('redux-json-api');
  const { config } = require('~/services/axios');
  const {
    create,
    read,
    update,
    destroy,
  } = require('~/utils');
  const api = require('../api').default;
  const args = {
    store: {
      dispatch: jest.fn(x => x),
    },
  };
  return {
    api,
    args,
    config,
    create,
    destroy,
    read,
    req,
    setAxiosConfig,
    store: args.store,
    update,
  };
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Hoc', () => {
  describe('api', () => {
    const t = (msg, req) => {
      it(msg, () => {
        const {
          api,
          args,
          config,
          setAxiosConfig,
          store,
        } = setup({ req });
        api({ req, ...args });
        const count = req ? 1 : 0;
        expect(config).toHaveBeenCalledTimes(count);
        req && expect(config).toHaveBeenCalledWith({ req });
        expect(setAxiosConfig).toHaveBeenCalledTimes(count);
        req && expect(setAxiosConfig).toHaveBeenCalledWith({ req });
        expect(store.dispatch).toHaveBeenCalledTimes(count);
        req && expect(store.dispatch).toHaveBeenCalledWith({ req });
      });
    };

    t('should call axiosConfig, setAxiosConfig and dispatch if req is defined', true);
    t('shouldn\'t all anybody when req is undefined', undefined);
  });
});
