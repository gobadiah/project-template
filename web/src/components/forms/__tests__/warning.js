import 'jsdom-global/register';

import React from 'react';
import { mount, shallow } from 'enzyme';

import Warning from '../warning';

const context = {
  i18n: {
    on: jest.fn(),
  },
  t: x => x,
};

describe('Warning', () => {
  it('should match snapshot when mounting', () => {
    const tree = mount(<Warning warning={['One warning', 'Two warning']} />, { context });
    expect(tree).toMatchSnapshot();
  });

  it('shallow render should contain elements', () => {
    const wrapper = shallow(<Warning warning='This is an warning' />, { context });
    expect(wrapper.contains('This is an warning')).toBeTruthy();
  });
});
