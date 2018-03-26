import generalConfig from '~/config';

import config from '../config';

const testAxios = (message, { req, headers }, Cookie, empty) => {
  it(message, () => {
    expect(config(empty ? undefined : { req, headers })).toEqual({
      baseUrl: generalConfig.api,
      withCredentials: true,
      headers: Object.assign({}, headers, Cookie ? { Cookie } : {}),
    });
  });
};

describe('Axios config', () => {
  testAxios('should have a default value', {});
  testAxios('should be possible to add extra headers', { headers: { some: 'headers' } });
  testAxios('should copy cookies from request', {
    req: {
      cookies: {
        some: 'value',
        other: 'cookie',
      },
    },
  }, 'some=value; other=cookie');
  testAxios('should handle when no args is given', {}, undefined, true);
});
