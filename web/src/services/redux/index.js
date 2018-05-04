import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { reducer as api } from 'redux-json-api';
import { isImmutable, fromJS } from 'immutable';
import { reducer as form } from 'redux-form';

import { reducer as auth } from '~/auth';

const middlewares = composeWithDevTools(applyMiddleware(thunkMiddleware));

const reducer = combineReducers({
  api,
  auth,
  form,
});

export default (state) => {
  // When re-creating state on client from serialized state from server,
  // we need to make immutable every component that want to be.
  if (state && state.auth && !isImmutable(state.auth)) {
    state.auth = fromJS(state.auth); // eslint-disable-line no-param-reassign
  }
  return createStore(reducer, state, middlewares);
};

export { default as withRedux } from 'next-redux-wrapper';
