import { bool, number, string } from 'prop-types';
import React from 'react';

import { defaultPropTypes } from '~/components';

import { Bg, Container, GreenBar, Label } from './styles';

const StatBar = ({
  label,
  height,
  ratio,
  right,
  width,
}) => (
  <Container right={right}>
    <Container right={right}>{label}</Container>
    <Container right={right}>
      <Bg height={height} width={width} />
      <GreenBar height={height} width={ratio * width} />
    </Container>
  </Container>
);

StatBar.propTypes = {
  height: number,
  ratio: number.isRequired,
  width: number.isRequired,
  label: string,
  right: bool,
};

StatBar.defaultProps = {
  height: 10,
  label: undefined,
  right: false,
};

StatBar.contextTypes = defaultPropTypes;

export default StatBar;
