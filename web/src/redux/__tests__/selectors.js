import store, { user } from '~/redux/__fixtures__/store';

import { a } from '~/redux/selectors';

describe('currentUser', () => {
  it('should returns a denormalized user if userId is defined', () => {
    const { currentUser } = require('~/redux');
    expect(currentUser(store.getState())).toEqual(user);
  });

  it('should return undefined is userId is undefined', () => {
    const { currentUser } = require('~/redux');
    const state = store.getState();
    state.auth = state.auth.set('userId', undefined);
    expect(currentUser(state)).toBeUndefined();
  });
});

test('a should be 5', () => {
  expect(a).toBe(5);
});
