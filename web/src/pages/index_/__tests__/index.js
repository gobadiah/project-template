import 'jsdom-global/register';

import React from 'react';
import { mount } from 'enzyme';

import i18n from '~/services/i18n';

import { pageProps } from '../../__tests__/utils';

import Index from '..';

i18n.languages = ['fr'];

describe('Index', () => {
  it('should match snapshot', () => {
    const wrapper = mount(<Index {...pageProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('shallow render should contain Hello world', () => {
    const user = {};
    const wrapper = mount(<Index {...pageProps} user={user} />);

    expect(wrapper.containsMatchingElement(<div>Hello</div>)).toBeTruthy();
  });
});
