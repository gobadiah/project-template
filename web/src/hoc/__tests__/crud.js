jest.mock('redux-json-api', () => ({
  setAxiosConfig: jest.fn(x => x),
}));
jest.mock('../../services/axios', () => ({
  config: jest.fn(() => 'config'),
}));
jest.mock('../../utils', () => ({
  create: jest.fn(() => 'createFunc'),
  read: jest.fn(() => 'readFunc'),
  update: jest.fn(() => 'updateFunc'),
  destroy: jest.fn(() => 'destroyFunc'),
}));

const setup = () => {
  const { setAxiosConfig } = require('redux-json-api');
  const { config } = require('~/services/axios');
  const {
    create,
    read,
    update,
    destroy,
  } = require('~/utils');
  const crud = require('../crud').default;
  const args = {
    store: {
      dispatch: jest.fn(x => x),
    },
  };
  return {
    args,
    config,
    create,
    crud,
    destroy,
    read,
    setAxiosConfig,
    update,
  };
};

describe('Hoc', () => {
  describe('CRUD', () => {
    it('should return a set of functions based on utils crud, setAxiosConfig', () => {
      const {
        args,
        config,
        create,
        crud,
        destroy,
        read,
        setAxiosConfig,
        update,
      } = setup();
      const result = crud(args);

      expect(result.setAxiosConfig()).toEqual('config');
      expect(config).toHaveBeenCalledTimes(1);
      expect(setAxiosConfig).toHaveBeenCalledTimes(1);
      expect(setAxiosConfig).toHaveBeenCalledWith('config');
      expect(args.store.dispatch).toHaveBeenCalledTimes(1);
      expect(args.store.dispatch).toHaveBeenCalledWith('config');

      expect(result.create).toEqual('createFunc');
      expect(result.read).toEqual('readFunc');
      expect(result.update).toEqual('updateFunc');
      expect(result.destroy).toEqual('destroyFunc');

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(args);

      expect(read).toHaveBeenCalledTimes(1);
      expect(read).toHaveBeenCalledWith(args);

      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(args);

      expect(destroy).toHaveBeenCalledTimes(1);
      expect(destroy).toHaveBeenCalledWith(args);
    });
  });
});
