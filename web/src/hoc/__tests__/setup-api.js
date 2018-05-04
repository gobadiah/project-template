/* eslint-disable no-unused-expressions */

const store = {
  dispatch: jest.fn(),
};

jest.mock('redux-json-api', () => ({
  setAxiosConfig: jest.fn(x => x),
}));

jest.mock('../../services/axios', () => ({
  config: jest.fn(x => x),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Hoc', () => {
  describe('setupApi', () => {
    const t = (msg, req) => {
      it(msg, () => {
        const setupApi = require('../setup-api').default;
        const { setAxiosConfig } = require('redux-json-api');
        const { config } = require('~/services/axios');
        setupApi({ req, store });
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
