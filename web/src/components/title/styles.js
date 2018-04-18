import React from 'react';
import styled, { css } from 'react-emotion';

import { Flex } from '~/styles';

export const MainDiv = styled(Flex)`
  margin: auto;
  margin-top: 43px;
  margin-bottom: 49px;
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

export const languages = css`
  position: absolute;
  top: 33px;
  right: 47px;
`;

export const myAccount = css`
  position: absolute;
  top: 33px;
  left: 40px;
`;

export const Cube = () => (
  <span>Cube</span>
);
