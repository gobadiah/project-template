import { Map } from 'immutable';

import { defaultState } from '~/redux/auth';

const someAuthState = Map({ userId: 8 });

beforeEach(() => { jest.unmock('redux-actions'); jest.resetModules(); });

describe('Auth reducer', () => {
  it('should combine actions signin and signout', () => {
    const mockHandleActions = jest.fn(() => 98);
    const mockCombineActions = jest.fn(() => 99);

    jest.mock('redux-actions', () => ({
      handleActions: mockHandleActions,
      combineActions: mockCombineActions,
      createActions: jest.fn(x => x),
    }));
    // eslint-disable-next-line no-unused-expressions
    require('~/redux/auth').default;
    expect(mockHandleActions).toHaveBeenCalledTimes(1);
    expect(mockHandleActions.mock.calls[0][0]).toHaveProperty('99');
    const next = mockHandleActions.mock.calls[0][0]['99'];
    expect(next(someAuthState, { payload: { userId: 4 } }).equals(Map({
      userId: 4,
    }))).toBe(true);
    expect(mockHandleActions.mock.calls[0][1].equals(defaultState)).toBe(true);
  });

  it('should have a default state', () => {
    const auth = require('~/redux/auth').default;
    const initialState = auth(undefined, { type: 'notype' });
    expect(initialState.equals(defaultState)).toBe(true);
  });

  it('should handle signin action', () => {
    const auth = require('~/redux/auth').default;
    const { signin } = require('~/redux/auth');
    const action = signin(5);
    const state = auth(undefined, action);
    expect(state.equals(Map({
      userId: 5,
    }))).toBe(true);
  });

  it('should handle signout action', () => {
    const auth = require('~/redux/auth').default;
    const { signout } = require('~/redux/auth');
    const state = auth(someAuthState, signout());
    expect(state.equals(defaultState)).toBe(true);
  });
});
