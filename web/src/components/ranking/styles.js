import styled, { css } from 'react-emotion';

import bgImage from './images/rankFullBG.png';

const ratio = 79 / 252;
const width = 251;

const common = css`
  color: var(--white);
  position: absolute;
  text-align: center;
`;

export const Container = styled('div')`
  position: relative;
  background-image: url(${bgImage});
  width: ${width}px;
  height: ${ratio * width}px;
`;

export const Main = styled('div')`
  ${common}
  width: 118px;
  font-weight: bold;
  font-size: 50px;
  line-height: 59px;
  top: 0px;
  left: 25px;
`;

export const Secondary = styled('div')`
  ${common}
  width: 82px;
  font-size: 24px;
  line-height: 29px;
  bottom: 15px;
  right: 18px;
`;
