import axios from 'axios';
import { hydrateStore } from 'redux-json-api';
import { signin as signinAction } from '~/redux/auth';

import config from '~/config';

export const signin = dispatch => data => axios.post(
  '/auth/signin',
  data,
  config.axios(),
).then((result) => {
  dispatch(hydrateStore(result.data));
  dispatch(signinAction(result.data.data.id));
});

export const register = dispatch => data => axios.post(
  '/auth/register',
  data,
  config.axios({
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
  }),
).then((result) => {
  dispatch(hydrateStore(result.data));
  dispatch(signinAction(result.data.data.id));
});
