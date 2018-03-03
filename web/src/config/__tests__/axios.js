import axios from '~/config/axios';

const testAxios = (message, { api, req, headers }, Cookie, empty) => {
  it(message, () => {
    expect(axios(empty ? undefined : { api, req, headers })).toEqual({
      baseUrl: api,
      withCredentials: true,
      headers: Object.assign({}, headers, Cookie ? { Cookie } : {}),
    });
  });
};

describe('Axios config', () => {
  testAxios('should have a default value', {});
  testAxios('should be possible to add extra headers', { headers: { some: 'headers' } });
  testAxios('should have an api params', { api: 'api' });
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
