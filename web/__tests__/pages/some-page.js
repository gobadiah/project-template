import 'jsdom-global/register';

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import SomePage from '~/pages/some-page';

describe('SomePage', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<SomePage />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shallow render should contain Hello world', () => {
    const wrapper = shallow(<SomePage />);
    wrapper.contains(<div>Hello world</div>);
  });
});
