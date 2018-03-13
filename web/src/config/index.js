import axios from './axios';

const port = parseInt(process.env.PORT, 10) || 3000;
const web = process.env.WEB_URL || `http://127.0.0.1:${port}`;
const api = process.browser ? `${web}/api` : process.env.API_URL ||
  'http://127.0.0.1:8000';

export default {
  api,
  web,
  port,
  axios: args => axios({ api, ...(args || {}) }),
  dev: process.env.NODE_ENV !== 'production',
};
