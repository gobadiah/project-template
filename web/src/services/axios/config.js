import cookie from 'cookie';

import generalConfig from '~/config';

export default ({ headers = {}, req } = {}) => {
  const config = {
    baseUrl: generalConfig.api,
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
