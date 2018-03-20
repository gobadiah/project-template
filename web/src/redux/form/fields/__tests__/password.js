import 'jsdom-global/register';

import React from 'react';
import { shallow } from 'enzyme';

import RenderField from '../render-field';

import PasswordField from '../password';

describe('PasswordField', () => {
  it('shallow render should contain a Field element with props', () => {
    const wrapper = shallow(<PasswordField some='prop' />);
    expect(wrapper.props()).toHaveProperty('component', RenderField);
    expect(wrapper.props()).toHaveProperty('name', 'password');
    expect(wrapper.props()).toHaveProperty('autoComplete', 'current-password');
    expect(wrapper.props()).toHaveProperty('label', 'Password');
    expect(wrapper.props()).toHaveProperty('some', 'prop');
  });
});
