import { handleAction, combineActions } from 'redux-actions';
import { Map } from 'immutable';

import { createActions } from './utils';

export const {
  signin,
  signout,
} = createActions({
  SIGNIN: id => ({ userId: id }),
  SIGNOUT: () => ({ userId: undefined }),
}, 'auth');

export const defaultState = Map({ userId: undefined });

export default handleAction(
  combineActions(signin, signout),
  { next: (state, { payload: { userId } }) => state.set('userId', userId) },
  defaultState,
);
