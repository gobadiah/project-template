jest.mock('nprogress', () => ({
  start: jest.fn(),
  done: jest.fn(),
}));
jest.mock('redux-json-api', () => ({
  createResource: jest.fn(x => x),
  readEndpoint: jest.fn(x => x),
  updateResource: jest.fn(x => x),
  deleteResource: jest.fn(x => x),
}));
jest.mock('../../utils', () => ({
  unauthorizedHandler: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const setup = ({ res = undefined, resolves = true } = { res: undefined, resolves: true }) => {
  const NProgress = require('nprogress');
  const { unauthorizedHandler } = require('~/utils');
  const { wrapper } = require('../crud');
  const err = new Error();
  const asPath = 'asPath';
  const needsLogin = true;
  const store = {
    dispatch: jest.fn(() => (resolves ? Promise.resolve() : Promise.reject(err))),
  };
  const foo = jest.fn(x => x);
  const arg = 'hello-world';
  return {
    arg,
    asPath,
    err,
    foo,
    needsLogin,
    NProgress,
    res,
    store,
    unauthorizedHandler,
    wrapper,
  };
};

describe('Utils', () => {
  describe('Crud', () => {
    describe('wrapper', () => {
      it('should call a number of function when dispatch resolves', async () => {
        const {
          arg,
          asPath,
          foo,
          needsLogin,
          NProgress,
          res,
          store,
          unauthorizedHandler,
          wrapper,
        } = setup();
        await expect(wrapper(foo)({
          res,
          asPath,
          needsLogin,
          store,
        })()(arg)).resolves.toBeUndefined();
        expect(NProgress.start).toHaveBeenCalled();
        expect(NProgress.done).toHaveBeenCalled();
        expect(unauthorizedHandler).not.toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(arg);
        expect(foo).toHaveBeenCalledWith(arg);
      });

      it('should call a number of function when dispatch rejects', async () => {
        const {
          arg,
          asPath,
          err,
          foo,
          needsLogin,
          NProgress,
          res,
          store,
          unauthorizedHandler,
          wrapper,
        } = setup({ resolves: false });
        await expect(wrapper(foo)({
          res,
          asPath,
          needsLogin,
          store,
        })()(arg)).resolves.toBeUndefined();
        expect(NProgress.start).toHaveBeenCalled();
        expect(NProgress.done).toHaveBeenCalled();
        expect(unauthorizedHandler).toHaveBeenCalledWith({
          err,
          res,
          asPath,
          needsLogin,
        });
        expect(store.dispatch).toHaveBeenCalledWith(arg);
        expect(foo).toHaveBeenCalledWith(arg);
      });

      it('shouldn\'t call NProgress on server when resolving', async () => {
        const {
          arg,
          asPath,
          foo,
          needsLogin,
          NProgress,
          res,
          store,
          unauthorizedHandler,
          wrapper,
        } = setup({ res: {} });
        await expect(wrapper(foo)({
          res,
          asPath,
          needsLogin,
          store,
        })()(arg)).resolves.toBeUndefined();
        expect(NProgress.start).not.toHaveBeenCalled();
        expect(NProgress.done).not.toHaveBeenCalled();
        expect(unauthorizedHandler).not.toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(arg);
        expect(foo).toHaveBeenCalledWith(arg);
      });

      it('shouldn\'t call NProgress on server when rejecting', async () => {
        const {
          arg,
          asPath,
          err,
          foo,
          needsLogin,
          NProgress,
          res,
          store,
          unauthorizedHandler,
          wrapper,
        } = setup({ res: {}, resolves: false });
        await expect(wrapper(foo)({
          res,
          asPath,
          needsLogin,
          store,
        })()(arg)).resolves.toBeUndefined();
        expect(NProgress.start).not.toHaveBeenCalled();
        expect(NProgress.done).not.toHaveBeenCalled();
        expect(unauthorizedHandler).toHaveBeenCalledWith({
          err,
          res,
          asPath,
          needsLogin,
        });
        expect(store.dispatch).toHaveBeenCalledWith(arg);
        expect(foo).toHaveBeenCalledWith(arg);
      });
    });
  });
});
