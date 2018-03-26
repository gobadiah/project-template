import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { reducer as api } from 'redux-json-api';
import { isImmutable, fromJS, Map } from 'immutable';

import { reducer as form } from './form';
import auth from './auth';

const middlewares = composeWithDevTools(applyMiddleware(thunkMiddleware));

const reducer = combineReducers({
  api,
  auth,
  form,
});

export default (state) => {
  if (state && state.auth && !isImmutable(state.auth)) {
    state.auth = fromJS(state.auth); // eslint-disable-line no-param-reassign
  }
  if (state && state.form && !isImmutable(state.form)) {
    state.form = fromJS(state.form); // eslint-disable-line no-param-reassign
  }
  let newState = state;
  if (!isImmutable(state)) {
    newState = Map(state);
  }
  return createStore(reducer, newState, middlewares);
};

export * from './json-api';
export * from './selectors';

export { default as withRedux } from 'next-redux-wrapper';
