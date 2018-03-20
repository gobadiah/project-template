import 'jsdom-global/register';

import React from 'react';
import { shallow } from 'enzyme';

import RenderField from '../render-field';

import EmailField from '../email';

import { required } from '../../validators';

describe('EmailField', () => {
  it('shallow render should contain a Field element with props', () => {
    const wrapper = shallow(<EmailField />);
    expect(wrapper.props()).toHaveProperty('component', RenderField);
    expect(wrapper.props()).toHaveProperty('name', 'email');
    expect(wrapper.props()).toHaveProperty('type', 'email');
    expect(wrapper.props()).toHaveProperty('autoComplete', 'email');
    expect(wrapper.props()).toHaveProperty('label', 'Email');
    expect(wrapper.props()).toHaveProperty('validate', [required]);
  });
});
