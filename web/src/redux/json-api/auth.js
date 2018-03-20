import axios from 'axios';
import { hydrateStore } from 'redux-json-api';

import { signin as signinAction } from '~/redux/auth';
import { handleFormErrors } from '~/redux/form';

import config from '~/config';

const post = (dispatch, path, data, headers) => axios.post(
  path,
  data,
  config.axios({ headers }),
).then((result) => {
  dispatch(hydrateStore(result.data));
  dispatch(signinAction(result.data.data.id));
}).catch(handleFormErrors);

export const signin = dispatch => data => post(dispatch, '/auth/signin', data);

export const register = dispatch => attributes => post(dispatch, '/auth/register', {
  data: {
    type: 'users',
    attributes,
  },
}, {
  'Content-Type': 'application/vnd.api+json',
  Accept: 'application/vnd.api+json',
});
