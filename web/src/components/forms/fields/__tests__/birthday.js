import 'jsdom-global/register';

import React from 'react';
import { shallow } from 'enzyme';

import RenderField from '../render-field';

import BirthdayField from '../birthday';

describe('BirthdayField', () => {
  it('shallow render should contain a Field element with props', () => {
    const wrapper = shallow(<BirthdayField />);
    expect(wrapper.props()).toHaveProperty('component', RenderField);
    expect(wrapper.props()).toHaveProperty('type', 'date');
    expect(wrapper.props()).toHaveProperty('autoComplete', 'bday');
    expect(wrapper.props()).toHaveProperty('label', 'Birthday');
    expect(wrapper.props()).toHaveProperty('name', 'birthday');
  });
});
