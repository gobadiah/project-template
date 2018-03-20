import 'jsdom-global/register';

import React from 'react';
import { shallow } from 'enzyme';

import { PlainSignInForm } from '../signin';

const store = {
  getState: jest.fn(() => ({
    form: {},
  })),
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};

const context = {
  t: jest.fn(),
  i18n: {},
  store,
};

describe('PlainSignInForm', () => {
  it('should match snapshot', () => {
    const handleSubmit = jest.fn();
    const tree = shallow(<PlainSignInForm handleSubmit={handleSubmit} />, { context });
    expect(tree).toMatchSnapshot();
  });
});
