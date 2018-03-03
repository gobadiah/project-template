import config from '../../../next.config';

describe('Next config', () => {
  it('should disable fs and add a rules for images', () => {
    const webpack = { module: { rules: [] } };
    const isServer = true;
    const result = config.webpack(webpack, { isServer });
    expect(result).toMatchSnapshot();
  });

  it('should not be using file system routing', () => {
    expect(config.useFileSystemPublicRoutes).toBe(false);
  });
});
