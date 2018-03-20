import 'jsdom-global/register';

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import SignIn from '..';

describe('SignIn', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<SignIn />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shallow rendering should contain SignInForm', () => {
    const wrapper = shallow(<SignIn />);
    wrapper.contains('SignInForm');
  });
});
