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
      expect(redirect(to, res)).toBeUndefined();
      expect(res.redirect).toHaveBeenCalledTimes(1);
      expect(res.redirect).toHaveBeenCalledWith(302, to);
    });

    it('should call Router replace when on client', () => {
      const res = undefined;
      const to = 'to';
      jest.mock('../../routes', () => ({
        Router: {
          replace: jest.fn(),
        },
      }));
      const redirect = require('../redirect').default;
      const { Router } = require('~/routes');
      redirect(to, res);
      expect(Router.replace).toHaveBeenCalledTimes(1);
      expect(Router.replace).toHaveBeenCalledWith(to);
    });
  });
});
