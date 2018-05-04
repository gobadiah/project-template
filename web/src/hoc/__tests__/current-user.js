jest.mock('../../auth', () => ({
  signinAction: jest.fn(x => x),
  currentUser: jest.fn(x => x),
}));
const mockRead = jest.fn(x => x);
const mockReadHandler = jest.fn(() => mockRead);
jest.mock('../../utils', () => ({
  read: jest.fn(() => mockReadHandler),
  redirect: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

const setup = ({
  req = {
    cookies: {
      access_token: true,
    },
  },
  needsLogin = true,
}) => {
  const asPath = '/some-page';
  const currentUser = require('../current-user').default;
  const { signinAction } = require('~/auth');
  const currentUserSelector = require('~/auth').currentUser;
  const { read, redirect } = require('~/utils');
  const store = {
    dispatch: jest.fn(),
    getState: jest.fn(() => 'state'),
  };
  const res = {};
  const args = {
    hello: 'world',
    needsLogin,
  };
  const result = {
    body: {
      data: {
        id: 5,
      },
    },
  };
  return {
    args,
    asPath,
    currentUser,
    currentUserSelector,
    read,
    redirect,
    req,
    res,
    result,
    signin: signinAction,
    store,
  };
};

describe('Hoc', () => {
  describe('currentUser', () => {
    it(
      'should dispatch signin and return the currentUser selector if success on server',
      async () => {
        const {
          args,
          asPath,
          currentUser,
          currentUserSelector,
          read,
          req,
          res,
          result,
          signin,
          store,
        } = setup({});
        await expect(currentUser({
          asPath,
          req,
          res,
          store,
          ...args,
        })).toEqual('/users/me');

        expect(read).toHaveBeenCalledTimes(1);
        expect(read).toHaveBeenCalledWith({
          asPath,
          needsLogin: args.needsLogin,
          res,
          store,
          hello: 'world',
        });

        expect(mockReadHandler).toHaveBeenCalledTimes(1);
        expect(mockReadHandler.mock.calls[0]).toHaveLength(1);
        const handler = mockReadHandler.mock.calls[0][0];

        const p = Promise.resolve(result);
        await expect(handler(p)).resolves.toEqual({
          user: 'state',
        });

        expect(mockRead).toHaveBeenCalledTimes(1);
        expect(mockRead).toHaveBeenCalledWith('/users/me');

        expect(signin).toHaveBeenCalledTimes(1);
        expect(signin).toHaveBeenCalledWith(result.body.data.id);

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(result.body.data.id);

        expect(store.getState).toHaveBeenCalledTimes(1);

        expect(currentUserSelector).toHaveBeenCalledTimes(1);
        expect(currentUserSelector).toHaveBeenCalledWith('state');
      },
    );

    it('should redirect if on a server, needsLogin and no access_token (not api call)', () => {
      const {
        args,
        currentUser,
        currentUserSelector,
        read,
        redirect,
        req,
        res,
        signin,
        store,
      } = setup({ req: {} });
      expect(currentUser({
        req,
        res,
        store,
        ...args,
      })).toEqual({});
      expect(redirect).toHaveBeenCalledWith(res, `/signin?returnUrl=${args.asPath}`);
      expect(read).not.toHaveBeenCalled();
      expect(currentUserSelector).not.toHaveBeenCalled();
      expect(signin).not.toHaveBeenCalled();
    });

    it('should do nothing while on a server no access_token and no needsLogin', () => {
      const {
        args,
        currentUser,
        currentUserSelector,
        read,
        redirect,
        req,
        res,
        signin,
        store,
      } = setup({ req: {}, needsLogin: false });
      expect(currentUser({
        req,
        res,
        store,
        ...args,
      })).toEqual({});
      expect(redirect).not.toHaveBeenCalled();
      expect(read).not.toHaveBeenCalled();
      expect(currentUserSelector).not.toHaveBeenCalled();
      expect(signin).not.toHaveBeenCalled();
    });

    it('should just return currentUserSelector if on client', () => {
      const {
        args,
        asPath,
        currentUser,
        currentUserSelector,
        read,
        req,
        signin,
        store,
      } = setup({ req: false });

      expect(currentUser({
        asPath,
        req,
        store,
        ...args,
      })).toEqual({ user: 'state' });

      expect(store.getState).toHaveBeenCalledTimes(1);

      expect(currentUserSelector).toHaveBeenCalledTimes(1);
      expect(currentUserSelector).toHaveBeenCalledWith('state');

      expect(read).not.toHaveBeenCalled();
      expect(signin).not.toHaveBeenCalled();
    });

    it('should redirect on client when needsLogin and currentSelector returns undefined', () => {
      const {
        args,
        asPath,
        currentUser,
        currentUserSelector,
        read,
        redirect,
        req,
        signin,
        store,
      } = setup({ req: false });

      currentUserSelector.mockImplementationOnce(() => undefined);
      expect(currentUser({
        asPath,
        req,
        store,
        ...args,
      })).toEqual({});

      expect(currentUserSelector).toHaveBeenCalledTimes(1);
      expect(currentUserSelector).toHaveBeenCalledWith('state');

      expect(read).not.toHaveBeenCalled();
      expect(signin).not.toHaveBeenCalled();

      expect(redirect).toHaveBeenCalledTimes(1);
      expect(redirect).toHaveBeenCalledWith(undefined, `/signin?returnUrl=${asPath}`);
    });
  });
});
