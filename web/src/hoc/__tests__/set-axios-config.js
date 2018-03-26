describe('Hoc', () => {
  describe('setAxiosConfig', () => {
    it('should dispatch a simple action when called', () => {
      const setAxiosConfig = require('../set-axios-config').default;
      jest.mock('redux-json-api', () => ({
        setAxiosConfig: jest.fn(x => x),
      }));
      const sac = require('redux-json-api').setAxiosConfig;
      jest.mock('../../services/axios', () => ({
        config: jest.fn(x => x),
      }));
      const { config } = require('~/services/axios');
      const input = {
        req: 'hello',
        store: {
          dispatch: jest.fn(),
        },
      };
      const expected = {
        req: input.req,
      };
      expect(setAxiosConfig(input)).toEqual({});

      expect(config).toHaveBeenCalledTimes(1);
      expect(config).toHaveBeenCalledWith(expected);

      expect(sac).toHaveBeenCalledTimes(1);
      expect(sac).toHaveBeenCalledWith(expected);

      expect(input.store.dispatch).toHaveBeenCalledTimes(1);
      expect(input.store.dispatch).toHaveBeenCalledWith(expected);
    });
  });
});
