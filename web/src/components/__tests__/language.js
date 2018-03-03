import 'jsdom-global/register';

import React from 'react';
import { shallow } from 'enzyme';

import Language, { Lang } from '../language';

const setup = (component, props = {}) => {
  const i18n = {
    changeLanguage: jest.fn(),
    t: jest.fn(key => key),
  };
  const wrapper = shallow(React.createElement(component, props), { context: { i18n, t: i18n.t } });
  return {
    wrapper,
    i18n,
  };
};

describe('Language', () => {
  it('should match snapshot', () => {
    const { wrapper } = setup(Language);
    expect(wrapper).toMatchSnapshot();
  });

  it('should contains two buttons', () => {
    const { wrapper } = setup(Language);
    expect(wrapper.find(Lang)).toHaveLength(2);
  });
});

describe('Lang', () => {
  const setupLang = () => setup(Lang, { lng: 'fr', name: 'french', img: 'img' });
  it('should match snapshot', () => {
    const { wrapper } = setupLang();
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain an input', () => {
    const { wrapper, i18n } = setupLang();
    expect(wrapper.find('input')).toHaveLength(1);
    wrapper.find('input').at(0).prop('onClick')();
    expect(i18n.changeLanguage.mock.calls).toHaveLength(1);
    expect(i18n.changeLanguage.mock.calls[0]).toEqual(['fr']);
  });
});
