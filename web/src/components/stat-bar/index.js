import { number, string } from 'prop-types';
import React from 'react';

import { FlexColumn } from '~/styles';
import { defaultPropTypes } from '~/components';

import { Bg, GreenBar } from './styles';

const StatBar = ({
  label,
  height,
  ratio,
  width,
}) => (
  <FlexColumn>
    <div>{label}</div>
    <div>
      <Bg height={height} width={width} />
      <GreenBar height={height} width={ratio * width} />
    </div>
  </FlexColumn>
);

StatBar.propTypes = {
  height: number,
  ratio: number.isRequired,
  width: number.isRequired,
  label: string,
};

StatBar.defaultProps = {
  height: 10,
  label: undefined,
};

StatBar.contextTypes = defaultPropTypes;

export default StatBar;
