jest.mock('redux-json-api', () => ({
  setAxiosConfig: jest.fn(x => x),
}));
jest.mock('../../services/axios', () => ({
  config: jest.fn(x => x || 'config'),
}));
jest.mock('../../utils', () => ({
  create: jest.fn(() => 'createFunc'),
  read: jest.fn(() => 'readFunc'),
  update: jest.fn(() => 'updateFunc'),
  destroy: jest.fn(() => 'destroyFunc'),
  createActions: jest.fn(() => ({ signin: 'signin', signout: 'signout' })),
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
  const extraDispatchToProps = require('../extraDispatchToProps').default;
  const dispatch = jest.fn(x => x);
  const props = {
    url: {
      asPath: '/some-path',
    },
  };
  return {
    extraDispatchToProps,
    dispatch,
    props,
    config,
    create,
    destroy,
    read,
    req,
    setAxiosConfig,
    update,
  };
};


describe('Hoc', () => {
  describe('extraDispatchToProps', () => {
    it('should return a set of functions for making api calls and configuring axios', () => {
      const {
        dispatch,
        props,
        config,
        create,
        extraDispatchToProps,
        destroy,
        read,
        setAxiosConfig,
        update,
      } = setup();
      const result = extraDispatchToProps(dispatch, props);

      expect(result.setAxiosConfig()).toEqual('config');
      expect(config).toHaveBeenCalledTimes(1);
      expect(setAxiosConfig).toHaveBeenCalledTimes(1);
      expect(setAxiosConfig).toHaveBeenCalledWith('config');
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith('config');

      expect(result.create).toEqual('createFunc');
      expect(result.read).toEqual('readFunc');
      expect(result.update).toEqual('updateFunc');
      expect(result.destroy).toEqual('destroyFunc');

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith({ asPath: props.url.asPath, dispatch });

      expect(read).toHaveBeenCalledTimes(1);
      expect(read).toHaveBeenCalledWith({ asPath: props.url.asPath, dispatch });

      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith({ asPath: props.url.asPath, dispatch });

      expect(destroy).toHaveBeenCalledTimes(1);
      expect(destroy).toHaveBeenCalledWith({ asPath: props.url.asPath, dispatch });
    });
  });
});
