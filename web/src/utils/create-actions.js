import { createActions } from 'redux-actions';

export default (actions, path) => createActions({
  web: {
    [path]: actions,
  },
}).web[path];
