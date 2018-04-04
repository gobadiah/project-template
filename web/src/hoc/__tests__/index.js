import { Map } from 'immutable';

const mockWithRedux = jest.fn(x => x);

jest.mock('next-redux-wrapper', () => jest.fn(() => mockWithRedux));

const mockTranslate = jest.fn(x => x);

jest.mock('react-i18next', () => ({
  translate: jest.fn(() => mockTranslate),
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

describe('Hoc', () => {
  it('should add a getInitialProps method to Page', () => {
    const Page = {};
    const hoc = require('..').default;
    expect(Page.getInitialProps).toBeUndefined();
    const result = hoc('page', { needsLogin: false })(Page);
    const state = {
      api: {},
      auth: Map({ userId: 5 }),
    };
    const store = {
      getState: jest.fn(() => state),
    };
    expect(result.getInitialProps({ store })).toBeInstanceOf(Promise);
  });

  it('add getInitialProps which uses reducePromises', async () => {
    const hoc = require('..').default;
    const mockReducer = jest.fn(() => Promise.resolve({}));
    jest.mock('../reduce-promises', () => jest.fn(() => mockReducer));
    const initialDispatch = Promise.resolve({});
    const x = {};
    const needsLogin = false;
    const endpoint = 'endpoint';
    const args = {
      some: 'args',
    };
    // todo test for mapStateToProps and mapDispatchToProps
    const result = hoc('x', { initialDispatch, needsLogin, endpoint })(x);
    await expect(result.getInitialProps(args)).resolves.toEqual({});
    const reducePromises = require('../reduce-promises');
    expect(reducePromises).toHaveBeenCalledTimes(2);
    expect(reducePromises).toHaveBeenCalledWith({
      namespaces: ['common', 'x'],
      needsLogin,
      endpoint,
      ...args,
    });
    const getI18nInitialProps = require('../i18n').default;
    const currentUser = require('../current-user').default;
    const setupApi = require('../setup-api').default;
    const crud = require('../crud').default;
    expect(mockReducer).toHaveBeenCalledTimes(2);
    expect(mockReducer).toHaveBeenCalledWith([crud, setupApi, getI18nInitialProps, currentUser]);
    expect(mockReducer).toHaveBeenCalledWith([initialDispatch]);
    jest.dontMock('../reduce-promises');
  });

  it('should call translate with some arguments', () => {
    const { translate } = require('react-i18next');
    const Page = {};
    const hoc = require('..').default;
    const i18n = require('~/services/i18n').default;
    const result = hoc('page')(Page);
    expect(translate).toHaveBeenCalledTimes(1);
    expect(translate).toHaveBeenCalledWith(
      ['common', 'page'],
      { i18n, wait: undefined },
    );
    expect(mockTranslate).toHaveBeenCalledTimes(1);
    expect(mockTranslate).toHaveBeenCalledWith(Page);
    expect(result).toBe(Page);
  });

  it('should call withRedux with our createStore', () => {
    const withRedux = require('next-redux-wrapper');
    const createStore = require('~/services/redux').default;
    jest.mock('../extraDispatchToProps', () => jest.fn(() => ({ some: 'extraProps' })));
    const extraDispatchToProps = require('../extraDispatchToProps');
    const Page = {};
    const hoc = require('..').default;
    const mapStateToProps = { this: 'once' };
    const mapDispatchToProps = jest.fn(() => ({ that: 'twice' }));
    const component = hoc('page', { mapStateToProps, mapDispatchToProps })(Page);
    expect(withRedux).toHaveBeenCalledTimes(1);
    expect(withRedux.mock.calls[0][0]).toEqual(createStore);
    expect(withRedux.mock.calls[0][1]).toEqual(mapStateToProps);
    const allMapDispatchToProps = withRedux.mock.calls[0][2];
    const dispatch = 'a';
    const props = 'b';
    expect(allMapDispatchToProps(dispatch, props)).toEqual({ that: 'twice', some: 'extraProps' });
    expect(extraDispatchToProps).toHaveBeenCalledTimes(1);
    expect(extraDispatchToProps).toHaveBeenCalledWith(dispatch, props);
    expect(mapDispatchToProps).toHaveBeenCalledTimes(1);
    expect(mapDispatchToProps).toHaveBeenCalledWith(dispatch, props);
    expect(mockWithRedux).toHaveBeenCalledTimes(1);
    expect(mockWithRedux).toHaveBeenCalledWith(Page);
    expect(component).toBe(Page);
  });
});
