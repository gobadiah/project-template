import { Map } from 'immutable';
import { handleActions, combineActions } from 'redux-actions';
import { hydrateStore } from 'redux-json-api';
import axios from 'axios';

import { config } from '~/services/axios';
import { errorHandler } from '~/utils/forms';

import { createActions } from './utils';

const {
  signin,
  signout,
} = createActions({
  SIGNIN: id => ({ userId: id }),
  SIGNOUT: () => ({ userId: null }),
}, 'auth');

export { signin as signinAction };

export const defaultState = Map({ userId: null });

export default handleActions(
  {
    [combineActions(signin, signout)]: (state, { payload: { userId } }) =>
      state.set('userId', userId),
  },
  defaultState,
);

const post = (dispatch, path, data, headers) => axios.post(
  path,
  data,
  config({ headers }),
).then((result) => {
  dispatch(hydrateStore(result.data));
  dispatch(signin(result.data.data.id));
}).catch(errorHandler);

const signinAction = dispatch => data => post(dispatch, '/api/auth/signin', data);
export { signinAction as signin, signout };

export const register = dispatch => attributes => post(dispatch, '/api/auth/register', {
  data: {
    type: 'users',
    attributes,
  },
}, {
  'Content-Type': 'application/vnd.api+json',
  Accept: 'application/vnd.api+json',
});
