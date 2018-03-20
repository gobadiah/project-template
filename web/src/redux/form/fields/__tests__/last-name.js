import 'jsdom-global/register';

import React from 'react';
import { shallow } from 'enzyme';

import RenderField from '../render-field';

import LastNameField from '../last-name';

describe('LastNameField', () => {
  it('shallow render should contain a Field element with props', () => {
    const wrapper = shallow(<LastNameField />);
    expect(wrapper.props()).toHaveProperty('component', RenderField);
    expect(wrapper.props()).toHaveProperty('name', 'last_name');
    expect(wrapper.props()).toHaveProperty('type', 'text');
    expect(wrapper.props()).toHaveProperty('autoComplete', 'family-name');
    expect(wrapper.props()).toHaveProperty('label', 'Last name');
  });
});
