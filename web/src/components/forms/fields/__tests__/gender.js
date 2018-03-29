import 'jsdom-global/register';

import React from 'react';
import { shallow } from 'enzyme';

import { FemaleField, GenderField, MaleField } from '../gender';

describe('FemaleField', () => {
  it('shallow render should match snapshot', () => {
    const wrapper = shallow(<FemaleField />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass down props', () => {
    const wrapper = shallow(<FemaleField some='prop' />);
    expect(wrapper.find('GenderField').props()).toHaveProperty('some', 'prop');
  });
});

describe('MaleField', () => {
  it('shallow render should match snapshot', () => {
    const wrapper = shallow(<MaleField />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass down props', () => {
    const wrapper = shallow(<MaleField some='prop' />);
    expect(wrapper.find('GenderField').props()).toHaveProperty('some', 'prop');
  });
});

describe('GenderField', () => {
  it('shallow render should match snapshot', () => {
    const wrapper = shallow(<GenderField value='trans' label='Trans' this='day' />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass some props to Field', () => {
    const wrapper = shallow(<GenderField value='trans' label='Trans' this='day' />);
    const props = wrapper.find('Field').props();
    expect(props).toHaveProperty('value', 'trans');
    expect(props).toHaveProperty('label', 'Trans');
    expect(props).toHaveProperty('this', 'day');
  });
});
