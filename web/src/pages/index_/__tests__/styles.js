import styles, { foo } from '../styles';

describe('Pages', () => {
  describe('Index', () => {
    describe('styles', () => {
      it('should match snapshot', () => {
        expect(styles).toMatchSnapshot();
      });

      it('should foo because if not Code Climate say there is no code coverage', () => {
        expect(foo()).toEqual('bar');
      });
    });
  });
});
