import 'jsdom-global/register';

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import SignInForm from '../signin';

describe('SignInForm', () => {
  it('should match snapshot', () => {
    const handleSubmit = jest.fn();
    const t = jest.fn();
    const tree = renderer.create(<SignInForm
      handleSubmit={handleSubmit}
      t={t}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shallow render should contain elements', () => {
    const handleSubmit = jest.fn();
    const t = jest.fn();
    const wrapper = shallow(<SignInForm handleSubmit={handleSubmit} t={t} />);
    wrapper.contains(<div>Hello world</div>);
  });
});
