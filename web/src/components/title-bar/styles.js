import styled, { css } from 'react-emotion';

import { FlexCenter } from '~/styles';

export const MainDiv = styled(FlexCenter)`
  position: relative;
  width: 640px;
  height: 89px;
  background-image: linear-gradient(to left, var(--apple-green), var(--yellow-green));
  font-size: 36px;
  font-weight: bold;
  line-height: 0.81;
  text-align: center;
  color: var(--white);
  text-shadow: 2px 2px 0 var(--apple-green);
  vertical-align: middle;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const CloseButton = styled('button')`
  position: absolute;
  display: flex;
  top: 37px;
  right: 34px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const closeImg = css`
  margin: auto;
`;
