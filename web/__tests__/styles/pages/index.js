import styles from '~/styles/pages';

describe('Styles', () => {
  describe('Pages', () => {
    describe('index', () => {
      it('should match snapshot', () => {
        expect(styles).toMatchSnapshot();
      });
    });
  });
});
