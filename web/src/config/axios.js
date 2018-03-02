import cookie from 'cookie';

export default (args) => {
  const { headers = {}, req, api } = args || {};
  if (req) {
    const cookies = Object.keys(req.cookies).map(key => cookie.serialize(key, req.cookies[key])).join('; ');
    headers.Cookie = cookies;
  }
  return {
    baseUrl: api,
    withCredentials: true,
    headers,
  };
};
