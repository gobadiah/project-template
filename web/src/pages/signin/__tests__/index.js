import 'jsdom-global/register';

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import i18n from '~/services/i18n';

import { pageProps } from '../../__tests__/utils';

import SignIn from '..';

i18n.languages = ['fr'];

describe('SignIn', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<SignIn {...pageProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shallow rendering should contain SignInForm', () => {
    const wrapper = shallow(<SignIn {...pageProps} />);
    wrapper.contains('SignInForm');
  });
});
