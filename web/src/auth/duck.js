import { Map } from 'immutable';
import { handleActions, combineActions } from 'redux-actions';
import { hydrateStore } from 'redux-json-api';
import NProgress from 'nprogress';
import axios from 'axios';

import { Router } from '~/routes';
import { config } from '~/services/axios';
import { createActions, redirect } from '~/utils';
import { errorHandler } from '~/utils/forms';

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

const post = (dispatch, path, data, headers) => {
  // This will probably be called only on client. So we can call NProgress
  NProgress.start();
  return axios.post(
    path,
    data,
    config({ headers }),
  ).then((result) => {
    dispatch(hydrateStore(result.data));
    dispatch(signin(result.data.data.id));
    const returnUrl = Router.router.query.returnUrl || '/';
    redirect(undefined, returnUrl);
  }).catch((err) => {
    NProgress.done();
    errorHandler(err);
  });
};

const signinAction = dispatch => data => post(dispatch, '/auth/signin', data);
export { signinAction as signin, signout };

export const register = dispatch => attributes => post(dispatch, '/auth/register', {
  data: {
    type: 'users',
    attributes,
  },
}, {
  'Content-Type': 'application/vnd.api+json',
  Accept: 'application/vnd.api+json',
});
