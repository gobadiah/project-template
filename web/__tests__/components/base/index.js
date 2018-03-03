describe('Components', () => {
  describe('Base', () => {
    describe('index', () => {
      it('should export Page and PureComponent', () => {
        const { Page, PureComponent } = require('~/components/base');

        expect(Page).toBeDefined();
        expect(PureComponent).toBeDefined();
      });
    });
  });
});
