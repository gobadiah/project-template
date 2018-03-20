import 'jsdom-global/register';

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Register from '..';

describe('Register', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<Register />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shallow rendering should contain RegisterForm', () => {
    const wrapper = shallow(<Register />);
    wrapper.contains('RegisterForm');
  });
});
