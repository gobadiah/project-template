import { createActions as ca } from 'redux-actions';

export const createActions = (actions, path) => ca({
  web: {
    [path]: actions,
  },
}).web[path];

export const a = 1;
