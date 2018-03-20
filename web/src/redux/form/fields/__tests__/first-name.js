import 'jsdom-global/register';

import React from 'react';
import { shallow } from 'enzyme';

import RenderField from '../render-field';

import FirstNameField from '../first-name';

describe('FirstNameField', () => {
  it('shallow render should contain a Field element with props', () => {
    const wrapper = shallow(<FirstNameField />);
    expect(wrapper.props()).toHaveProperty('component', RenderField);
    expect(wrapper.props()).toHaveProperty('name', 'first_name');
    expect(wrapper.props()).toHaveProperty('type', 'text');
    expect(wrapper.props()).toHaveProperty('autoComplete', 'given-name');
    expect(wrapper.props()).toHaveProperty('label', 'First name');
  });
});
