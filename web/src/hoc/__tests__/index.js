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
    const result = hoc()(Page);
    expect(result.getInitialProps()).toBeInstanceOf(Promise);
  });

  it('add getInitialProps which uses reducePromises', () => {
    const hoc = require('..').default;
    const mockReducer = jest.fn();
    jest.mock('../reduce-promises', () => jest.fn(() => mockReducer));
    const x = {};
    const result = hoc('x')(x);
    result.getInitialProps({ some: 'args' });
    const reducePromises = require('../reduce-promises');
    expect(reducePromises).toHaveBeenCalledTimes(1);
    expect(reducePromises).toHaveBeenCalledWith({
      namespaces: ['common', 'x'],
      some: 'args',
    });
    const getI18nInitialProps = require('../i18n').default;
    expect(mockReducer).toHaveBeenCalledTimes(1);
    expect(mockReducer).toHaveBeenCalledWith([getI18nInitialProps]);
    jest.dontMock('../reduce-promises');
  });

  it('should call translate with some arguments', () => {
    const { translate } = require('react-i18next');
    const Page = {};
    const hoc = require('..').default;
    const i18n = require('../../config/i18n').default;
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
    const createStore = require('~/redux').default;
    const Page = {};
    const hoc = require('..').default;
    const component = hoc('page')(Page);
    expect(withRedux).toHaveBeenCalledTimes(1);
    expect(withRedux.mock.calls[0][0]).toBe(createStore);
    expect(withRedux.mock.calls[0][1]()).toEqual({});
    const dispatchProps = withRedux.mock.calls[0][2];
    const dispatch = jest.fn();
    const props = {};
    const result = dispatchProps(dispatch, props);
    expect(typeof result.create).toEqual('function');
    expect(typeof result.register).toEqual('function');
    expect(typeof result.setAxiosConfig).toEqual('function');
    expect(typeof result.signin).toEqual('function');
    expect(typeof result.update).toEqual('function');
    expect(mockWithRedux).toHaveBeenCalledTimes(1);
    expect(mockWithRedux).toHaveBeenCalledWith(Page);
    expect(component).toBe(Page);
  });
});
