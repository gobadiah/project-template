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

  it('has an extraDispatchProps with a few props', () => {
    const dispatch = jest.fn(x => x);
    jest.mock('redux-json-api', () => ({
      setAxiosConfig: jest.fn(x => x),
      createResource: jest.fn(x => x),
      updateResource: jest.fn(x => x),
      reducer: () => {},
    }));
    const {
      setAxiosConfig,
      createResource,
      updateResource,
    } = require('redux-json-api');
    jest.mock('../../services/axios', () => ({
      config: jest.fn(() => 'config'),
    }));
    const { config } = require('~/services/axios');
    jest.mock('../../auth', () => ({
      signin: jest.fn(x => x),
      register: jest.fn(x => x),
      reducer: () => {},
    }));
    const { signin, register } = require('~/auth');
    const { extraDispatchProps } = require('..');
    const props = extraDispatchProps(dispatch);
    expect(Object.keys(props)).toEqual([
      'setAxiosConfig',
      'create',
      'update',
      'signin',
      'register',
    ]);
    expect(props.setAxiosConfig()).toEqual('config');
    expect(config).toHaveBeenCalledTimes(1);
    expect(setAxiosConfig).toHaveBeenCalledTimes(1);
    expect(setAxiosConfig).toHaveBeenCalledWith('config');

    const data = 'data';
    expect(props.create(data)).toEqual(data);
    expect(createResource).toHaveBeenCalledTimes(1);
    expect(createResource).toHaveBeenCalledWith(data);

    expect(props.update(data)).toEqual(data);
    expect(updateResource).toHaveBeenCalledTimes(1);
    expect(updateResource).toHaveBeenCalledWith(data);

    expect(props.signin(data)).toEqual(data);
    expect(signin).toHaveBeenCalledTimes(1);
    expect(signin).toHaveBeenCalledWith(dispatch);

    expect(props.register(data)).toEqual(data);
    expect(register).toHaveBeenCalledTimes(1);
    expect(register).toHaveBeenCalledWith(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(5);
  });
});
