import 'jsdom-global/register';

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { css } from 'react-emotion';

import { Flex, FlexColumn } from '~/styles';

import Field from '..';

const props = {
  autoComplete: 'email',
  className: css`
  color: red;
`,
  cols: 64,
  formatError: jest.fn(e => e),
  formatWarning: jest.fn(w => w),
  input: {},
  inputClassName: css`
  color: blue;
`,
  label: 'this is a label',
  placeholder: 'support@example.com',
  meta: {
    error: 'Nah this I can\'t do',
    touched: true,
    warning: 'Be careful with that',
  },
  rows: 4,
  t: jest.fn(x => x),
  type: 'email',
};

describe('Field', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<Field {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shallow render should contain elements', () => {
    const wrapper = shallow(<Field {...props} />);
    expect(wrapper.contains(<div>Hello world</div>)).toBeFalsy();
  });

  it('should use a Flex if column is false', () => {
    const wrapper = shallow(<Field {...props} />);
    expect(wrapper.find(FlexColumn)).toHaveLength(0);
    expect(wrapper.find(Flex)).toHaveLength(1);
  });

  it('should use a FlexColumn if column is true', () => {
    const wrapper = shallow(<Field {...props} column />);
    expect(wrapper.find(FlexColumn)).toHaveLength(1);
    expect(wrapper.find(Flex)).toHaveLength(0);
  });

  it('should use a textarea if type is set to it', () => {
    const wrapper = shallow(<Field {...props} type='textarea' />);
    expect(wrapper.find('textarea')).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(0);
  });
});
