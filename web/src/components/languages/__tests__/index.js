import 'jsdom-global/register';

import React from 'react';
import { shallow } from 'enzyme';

import Languages from '..';
import Lang from '../lang';

const setup = (component, props = {}) => {
  const i18n = require('~/services/i18n').default;
  i18n.changeLanguage = jest.fn();
  i18n.t = jest.fn(key => key);
  i18n.languages = ['fr'];
  const wrapper = shallow(React.createElement(component, props), { context: { i18n, t: i18n.t } });
  return {
    wrapper,
    i18n,
  };
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Languages', () => {
  it('should match snapshot', () => {
    const { wrapper } = setup(Languages);
    expect(wrapper).toMatchSnapshot();
  });

  it('should contains two buttons', () => {
    const { wrapper } = setup(Languages);
    expect(wrapper.find(Lang)).toHaveLength(2);
  });

  it('has a method for changing language', () => {
    const { wrapper, i18n } = setup(Languages);
    const lng = 'en';
    wrapper.instance().setLanguage(lng);
    expect(i18n.changeLanguage).toHaveBeenCalledWith(lng);
    expect(window.document.cookie).toEqual(`i18next=${lng}`);
  });

  it('clicking on a button change language', () => {
    const { wrapper, i18n } = setup(Languages);
    expect(i18n.changeLanguage).toHaveBeenCalledTimes(0);
    wrapper.find('button').simulate('click');
    expect(i18n.changeLanguage).toHaveBeenCalledTimes(1);
  });
});

describe('Lang', () => {
  const setupLang = () => setup(Lang, { lng: 'fr', name: 'french', img: 'img' });
  it('should match snapshot', () => {
    const { wrapper } = setupLang();
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain an input', () => {
    const { wrapper } = setupLang();
    expect(wrapper.find('img')).toHaveLength(1);
    /*
    wrapper.find('input').at(0).prop('onClick')();
    expect(i18n.changeLanguage.mock.calls).toHaveLength(1);
    expect(i18n.changeLanguage.mock.calls[0]).toEqual(['fr']);
    */
  });
});
