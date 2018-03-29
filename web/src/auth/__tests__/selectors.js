import store, { user } from '~/services/redux/__fixtures__/store';

describe('currentUser', () => {
  it('should returns a denormalized user if userId is defined', () => {
    const { currentUser } = require('../selectors');
    expect(currentUser(store.getState())).toEqual(user);
  });

  it('should return undefined is userId is undefined', () => {
    const { currentUser } = require('../selectors');
    const state = store.getState();
    state.auth = state.auth.set('userId', undefined);
    expect(currentUser(state)).toBeUndefined();
  });
});
