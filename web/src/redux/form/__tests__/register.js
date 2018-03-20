import 'jsdom-global/register';

import React from 'react';
import { shallow } from 'enzyme';

import { PlainRegisterForm } from '../register';

const store = {
  getState: jest.fn(() => ({
    form: {},
  })),
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};

const context = {
  t: jest.fn(),
  i18n: {
    on: jest.fn(),
  },
  store,
};

describe('PlainRegisterForm', () => {
  it('should match snapshot', () => {
    const handleSubmit = jest.fn();
    const tree = shallow(<PlainRegisterForm
      pristine
      submitting={false}
      reset={jest.fn()}
      handleSubmit={handleSubmit}
    />, { context });
    expect(tree).toMatchSnapshot();
  });
});
