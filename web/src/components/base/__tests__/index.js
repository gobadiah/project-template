describe('Components', () => {
  describe('Base', () => {
    describe('index', () => {
      it('should export Page and PureComponent', () => {
        const { Page, PureComponent } = require('..');

        expect(Page).toBeDefined();
        expect(PureComponent).toBeDefined();
      });
    });
  });
});
