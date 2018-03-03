const t = v => expect(v).toBeDefined();

describe('Redux', () => {
  describe('json-api', () => {
    describe('index', () => {
      it('should export everything from next and auth', () => {
        const {
          handleUnauthorized,
          setupApi,
          getMe,
          signin,
          register,
        } = require('..');
        t(handleUnauthorized);
        t(setupApi);
        t(getMe);
        t(signin);
        t(register);
      });
    });
  });
});
