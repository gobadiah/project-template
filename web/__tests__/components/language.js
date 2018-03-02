import 'jsdom-global/register';

import React from 'react';
import { shallow } from 'enzyme';

import Language from '~/components/language';

describe('Language', () => {
  it('should match snapshot', () => {
    const i18n = {
      changeLanguage: jest.fn(),
      t: jest.fn(key => key),
    };
    const wrapper = shallow(<Language />, { context: { i18n, t: i18n.t } });
    expect(wrapper).toMatchSnapshot();
  });

  it('should contains two buttons', () => {
    const i18n = {
      changeLanguage: jest.fn(),
      t: jest.fn(key => key),
    };
    const wrapper = shallow(<Language />, { context: { i18n, t: i18n.t } });
    expect(wrapper.find('input')).toHaveLength(2);
    wrapper.find('input').at(0).prop('onClick')();
    wrapper.find('input').at(1).prop('onClick')();
    expect(i18n.changeLanguage.mock.calls).toHaveLength(2);
    expect(i18n.changeLanguage.mock.calls[0]).toEqual(['fr']);
    expect(i18n.changeLanguage.mock.calls[1]).toEqual(['en']);
  });
});
