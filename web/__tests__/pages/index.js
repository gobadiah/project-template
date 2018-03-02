import 'jsdom-global/register';

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Index from '~/pages';

describe('Index', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<Index />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shallow render should contain Hello world', () => {
    const wrapper = shallow(<Index />);
    wrapper.contains(<div>Hello world</div>);
  });
});
