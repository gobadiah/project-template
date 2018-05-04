// eslint-disable-next-line import/prefer-default-export
export const pageProps = {
  url: {
    asPath: '/some-path',
  },
};

describe('Pages', () => {
  describe('utils', () => {
    it('should have props for pages', () => {
      expect(pageProps).toEqual({
        url: {
          asPath: '/some-path',
        },
      });
    });
  });
});
