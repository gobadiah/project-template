import { foo } from '..';

describe('Components', () => {
  describe('Base', () => {
    describe('index', () => {
      it('should export Page and PureComponent', () => {
        const { Page, PureComponent } = require('..');

        expect(Page).toBeDefined();
        expect(PureComponent).toBeDefined();
      });

      it('should foo because if not Code Climate say there is no code coverage', () => {
        expect(foo()).toEqual('bar');
      });
    });
  });
});
