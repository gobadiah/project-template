import { Map } from 'immutable';

beforeEach(() => {
  jest.resetModules();
});

describe('createStore', () => {
  it('should call redux createStore and combineReducers', () => {
    jest.mock('redux-thunk', () => 'thunkMiddleware');
    jest.mock('../../src/redux/auth', () => 'auth');

    const mockCreateStore = jest.fn();
    const mockCombineReducers = jest.fn(x => x);
    const mockApplyMiddleware = jest.fn(x => x);

    jest.mock('redux', () => ({
      createStore: mockCreateStore,
      combineReducers: mockCombineReducers,
      applyMiddleware: mockApplyMiddleware,
    }));

    const mockReducer = 'reducer';
    jest.mock('redux-json-api', () => ({
      reducer: mockReducer,
    }));

    const mockComposeWithDevTools = jest.fn(x => x);

    jest.mock('redux-devtools-extension', () => ({
      composeWithDevTools: mockComposeWithDevTools,
    }));

    const createStore = require('~/redux').default;
    expect(mockCreateStore).not.toHaveBeenCalled();
    const state = { auth: Map({ userId: 9 }) };

    createStore(state);

    expect(mockApplyMiddleware).toHaveBeenCalledTimes(1);
    expect(mockApplyMiddleware).toHaveBeenCalledWith('thunkMiddleware');

    expect(mockComposeWithDevTools).toHaveBeenCalledTimes(1);
    expect(mockComposeWithDevTools).toHaveBeenCalledWith('thunkMiddleware');

    const reducers = {
      auth: 'auth',
      api: mockReducer,
    };

    expect(mockCombineReducers).toHaveBeenCalledTimes(1);
    expect(mockCombineReducers).toHaveBeenCalledWith(reducers);
    expect(mockCreateStore).toHaveBeenCalledTimes(1);
    expect(mockCreateStore).toHaveBeenCalledWith(
      reducers,
      state,
      'thunkMiddleware',
    );

    jest.dontMock('redux-thunk');
    jest.dontMock('redux');
    jest.dontMock('redux-devtools-extension');
    jest.dontMock('../../src/redux/auth');
  });

  it('should return a store with default state given an undefined state', () => {
    const createStore = require('~/redux').default;
    const defaultAuthState = require('~/redux/auth').defaultState;
    const state = undefined;
    const store = createStore(state);
    expect(Object.keys(store.getState())).toEqual(['auth']);
    expect(store.getState().auth.equals(defaultAuthState)).toBe(true);
  });

  it('should return a store with given state', () => {
    const createStore = require('~/redux').default;
    const state = {
      auth: Map({
        userId: 7,
      }),
    };
    const store = createStore(state);
    expect(store.getState()).toEqual(state);
  });

  it('should change the state after dispatching a simple action', () => {
    const createStore = require('~/redux').default;
    const defaultAuthState = require('~/redux/auth').defaultState;
    const state = undefined;
    const store = createStore(state);
    const { signin, signout } = require('~/redux/auth');
    store.dispatch(signin(8));
    expect(Object.keys(store.getState())).toEqual(['auth']);
    expect(store.getState().auth.equals(Map({
      userId: 8,
    }))).toBe(true);
    store.dispatch(signout());
    expect(Object.keys(store.getState())).toEqual(['auth']);
    expect(store.getState().auth.equals(defaultAuthState)).toBe(true);
  });
});
