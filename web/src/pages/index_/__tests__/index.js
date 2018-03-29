import 'jsdom-global/register';

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import i18n from '~/services/i18n';

import Index from '..';

i18n.languages = ['fr'];

describe('Index', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<Index i18n={i18n} t={i18n.t} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shallow render should contain Hello world', () => {
    const wrapper = shallow(<Index i18n={i18n} t={i18n.t} />);
    wrapper.contains(<div>Hello world</div>);
  });
});
