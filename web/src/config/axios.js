import cookie from 'cookie';

export default ({ headers = {}, req, api } = {}) => {
  const config = {
    baseUrl: api,
    withCredentials: true,
    headers,
  };
  if (req) {
    const cookies = Object.keys(req.cookies).map(key =>
      cookie.serialize(key, req.cookies[key])).join('; ');
    config.headers.Cookie = cookies;
  }
  return config;
};
