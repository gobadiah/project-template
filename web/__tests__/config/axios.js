import axios from '~/config/axios';

describe('Axios config', () => {
  it('should have a default value', () => {
    expect(axios()).toEqual({
      baseUrl: undefined,
      withCredentials: true,
      headers: {},
    });
  });

  it('should be possible to add extra headers', () => {
    const headers = { some: 'headers' };
    expect(axios({ headers })).toEqual({
      baseUrl: undefined,
      withCredentials: true,
      headers: {
        some: 'headers',
      },
    });
  });

  it('should have an api params', () => {
    const api = 'api';
    expect(axios({ api })).toEqual({
      baseUrl: api,
      withCredentials: true,
      headers: {},
    });
  });

  it('should copy cookies from request', () => {
    const req = {
      cookies: {
        some: 'value',
        other: 'cookie',
      },
    };
    expect(axios({ req })).toEqual({
      baseUrl: undefined,
      withCredentials: true,
      headers: {
        Cookie: 'some=value; other=cookie',
      },
    });
  });
});
