import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { reducer as api } from 'redux-json-api';

import auth from './auth';

const middlewares = composeWithDevTools(applyMiddleware(thunkMiddleware));

const reducer = combineReducers({
  api,
  auth,
});

export default state => createStore(reducer, state, middlewares);

export * from './json-api';
export * from './selectors';

export { default as withRedux } from 'next-redux-wrapper';
