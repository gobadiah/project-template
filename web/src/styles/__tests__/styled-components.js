import 'jsdom-global/register';

import React from 'react';
import renderer from 'react-test-renderer';

import {
  Flex,
  FlexColumn,
  FlexCenter,
  FlexColumnCenter,
} from '../styled-components';

describe('Styled-component', () => {
  it('has a Flex component which match snapshot', () => {
    const tree = renderer.create(<Flex />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a FlexColumn component which match snapshot', () => {
    const tree = renderer.create(<FlexColumn />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a FlexCenter component which match snapshot', () => {
    const tree = renderer.create(<FlexCenter />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a FlexColumnCenter component which match snapshot', () => {
    const tree = renderer.create(<FlexColumnCenter />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
