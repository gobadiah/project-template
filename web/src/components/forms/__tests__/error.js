import 'jsdom-global/register';

import React from 'react';
import { mount, shallow } from 'enzyme';

import Error from '../error';

const context = {
  i18n: {
    on: jest.fn(),
  },
  t: x => x,
};

describe('Error', () => {
  it('should match snapshot when mounting', () => {
    const tree = mount(<Error error={['One error', 'Two error']} />, { context });
    expect(tree).toMatchSnapshot();
  });

  it('shallow render should contain elements', () => {
    const wrapper = shallow(<Error error='This is an error' />, { context });
    expect(wrapper.contains('This is an error')).toBeTruthy();
  });
});
