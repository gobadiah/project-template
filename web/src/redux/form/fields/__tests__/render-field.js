import 'jsdom-global/register';

import React from 'react';
import { mount, shallow } from 'enzyme';

import RenderField from '../render-field';

const props = {
  input: {
    name: 'example field',
  },
  meta: {
    error: ['This is one error', 'this is another'],
    touched: true,
    warning: ['This is one warning', 'yet another'],
  },
  label: 'Some example field',
};

const context = {
  i18n: {},
  t: jest.fn(),
  user: undefined,
};

describe('RenderField', () => {
  it('should match snapshot', () => {
    const wrapper = mount(<RenderField {...props} />, { context });
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot with column=true', () => {
    const wrapper = mount(<RenderField {...props} column />, { context });
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain an input when type is text (as default)', () => {
    const wrapper = shallow(<RenderField {...props} />, { context });
    expect(wrapper.find('input').exists()).toBeTruthy();
  });

  it('should contain a textarea when type is textarea', () => {
    const wrapper = shallow(<RenderField {...props} type='textarea' />, { context });
    expect(wrapper.find('textarea').exists()).toBeTruthy();
  });
});
