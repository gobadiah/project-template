import path from 'path';

import config from '~/config/jest';

describe('Jest config', () => {
  it('should match this', () => {
    expect(config.rootDir).toEqual(path.join(__dirname, '../../../..'));
    delete config.rootDir;
    expect(config).toMatchSnapshot();
  });
});
