import 'jsdom-global/register';

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { pageProps } from '../../__tests__/utils';

import Register from '..';

describe('Register', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<Register {...pageProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shallow rendering should contain RegisterForm', () => {
    const wrapper = shallow(<Register {...pageProps} />);
    wrapper.contains('RegisterForm');
  });
});
