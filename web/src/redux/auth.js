import { handleActions, combineActions } from 'redux-actions';
import { Map } from 'immutable';

import { createActions } from './utils';

export const {
  signin,
  signout,
} = createActions({
  SIGNIN: id => ({ userId: id }),
  SIGNOUT: () => ({ userId: null }),
}, 'auth');

export const defaultState = Map({ userId: null });

export default handleActions(
  {
    [combineActions(signin, signout)]: (state, { payload: { userId } }) => state.set('userId', userId),
  },
  defaultState,
);
