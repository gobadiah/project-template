beforeEach(() => {
  jest.resetModules();
});

describe('Utils', () => {
  describe('redirect', () => {
    it('should call redirect on response when on server', () => {
      const redirect = require('../redirect').default;
      const res = {
        redirect: jest.fn(),
      };
      const to = 'to';
      expect(redirect(res, to)).toBeUndefined();
      expect(res.redirect).toHaveBeenCalledTimes(1);
      expect(res.redirect).toHaveBeenCalledWith(302, to);
    });

    it('should call Router pushRoute when on client', () => {
      const res = undefined;
      const to = 'to';
      const params = 'params';
      jest.mock('../../routes', () => ({
        Router: {
          pushRoute: jest.fn(),
        },
      }));
      const redirect = require('../redirect').default;
      const { Router } = require('~/routes');
      redirect(res, to, params);
      expect(Router.pushRoute).toHaveBeenCalledTimes(1);
      expect(Router.pushRoute).toHaveBeenCalledWith(to, params);
    });
  });
});
