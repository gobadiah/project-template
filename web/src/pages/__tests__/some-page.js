import 'jsdom-global/register';

import React from 'react';

import { mount } from 'enzyme';
import { pageProps } from '~/pages/__tests__/utils';
import SomePage from '~/pages/some-page';

describe('SomePage', () => {
  it('should match snapshot', () => {
    const wrapper = mount(<SomePage {...pageProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('shallow render should contain Hello world', () => {
    const wrapper = mount(<SomePage {...pageProps} />);
    expect(wrapper.contains(<div>Hello world</div>)).toBeTruthy();
  });
});
