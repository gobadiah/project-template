beforeEach(() => {
  jest.resetModules();
});

describe('unauthorizedHandler', () => {
  it('should redirect on server for status 401 when needsLogin', () => {
    const unauthorizedHandler = require('../unauthorized-handler').default;
    const res = {
      redirect: jest.fn(),
    };
    const asPath = '/some-page';
    unauthorizedHandler({
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
    jest.mock('../../routes');
    const unauthorizedHandler = require('../unauthorized-handler').default;
    const { Router } = require('~/routes');

    const asPath = '/some-page';
    unauthorizedHandler({
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
    jest.mock('../../routes');
    const unauthorizedHandler = require('../unauthorized-handler').default;
    const { Router } = require('~/routes');
    const res = {
      redirect: jest.fn(),
    };
    unauthorizedHandler({
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
    const unauthorizedHandler = require('../unauthorized-handler').default;
    expect(() => unauthorizedHandler({ err })).toThrow(err);
  });
});
