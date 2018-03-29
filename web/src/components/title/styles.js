import React from 'react';
import styled, { css } from 'react-emotion';

import { Flex } from '~/styles';

export const MainDiv = styled(Flex)`
  margin: auto;
  marginTop: 43px;
  align-items: center;
  width: 333px;
  height: 114px;
`;

export const logo = css`
  width: 100px;
  height: 113px;
`;

export const Company = styled('div')`
  margin-left: 20px;
  vertical-align: middle;
  font-size: 59px;
  font-weight: bold;
  color: var(--white);
`;

export const Kin = () => (
  <span css='color: var(--apple-green);'>
    Kin
  </span>
);

export const Cube = () => (
  <span>Cube</span>
);
