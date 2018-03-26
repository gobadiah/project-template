import 'jsdom-global/register';

import React from 'react';

import { mount, shallow } from 'enzyme';

import { Error, Form, Warning } from '..';

const props = {
  children: <div />,
  error: 'One error',
  handleSubmit: () => {},
  pristine: false,
  submitting: false,
  reset: () => {},
  warning: 'One warning',
};

const context = {
  i18n: {
    on: jest.fn(),
  },
  t: x => x,
};

describe('Form', () => {
  it('should match snapshot when mounting', () => {
    const tree = mount(<Form {...props} />, { context });
    expect(tree).toMatchSnapshot();
  });

  it('shallow render should contain elements', () => {
    const wrapper = shallow(<Form {...props} />, { context });
    expect(wrapper.contains(<Error error={props.error} />)).toBeTruthy();
    expect(wrapper.contains(<Warning warning={props.warning} />)).toBeTruthy();
  });
});
