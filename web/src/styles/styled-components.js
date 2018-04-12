import React from 'react';
import styled from 'react-emotion';

import backArrow from '~/images/backArrow.png';
import blueRectangle from '~/images/blueRectangle.png';
import blueRectangleRight from '~/images/blueRectangleRight.png';
import horizontalSep from '~/images/horizontalSep346.png';
import puce from '~/images/puce.png';
import verticalSep from '~/images/verticalSep.png';

export const Flex = styled('div')`
  display: flex;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexCenter = styled(Flex)`
  align-items: center;
  justify-content: center;
`;

export const FlexColumnCenter = styled(FlexColumn)`
  align-items: center;
  justify-content: center;
`;

export const FlexEnd = styled(Flex)`
  align-items: flex-end;
`;

export const Line = styled('div')`
  margin-top: 38px;
  margin-bottom: 30px;
  width: 550px;
  height: 2px;
  border: solid 1px var(--dark-blue-grey);
  background-color: var(--dark-blue-grey);
`;

export const SocialDiv = styled(FlexCenter)`
  align-self: stretch;
  justify-content: space-around;
  margin-top: 21px;
`;

export const WhiteBox = styled(FlexColumn)`
  opacity: 0.9;
  overflow: auto;
  border-radius: 5px;
  background-color: var(--white);
  padding: 28px;
`;

export const Normal = styled('span')`
  font-size: 30px;
  font-weight: bold;
  line-height: 0.97;
  text-align: left;
  color: #0e1e35;
  color: var(--dark-blue-grey);
`;

export const Small = styled('span')`
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: var(--dark-blue-grey);
`;

export const GreenHyphen = styled('div')`
  width: 9px;
  height: 4px;
  background-color: #7ed321;
  background-color: var(--apple-green);
`;

export const Puce = () => (
  <img
    alt=''
    src={puce}
    css='
      width: 16px;
      height: 16px;
      margin-right: 8px;
      margin-bottom: 5px;
    '
  />
);

export const VerticalSeparation = () => (
  <img
    src={verticalSep}
    alt=''
    css='
      margin-left: 15px;
      margin-right: 15px;
    '
  />
);

export const BackArrow = () => (
  <img
    src={backArrow}
    alt=''
    css='
      width: 14px;
      height: 22px;
      cursor: pointer;
    '
  />
);

export const HorizontalSeparation = () => (
  <img
    src={horizontalSep}
    alt=''
    css='width: 900px'
  />
);

export const Score = styled('div')`
  background-image: url(${props => (props.right ? blueRectangleRight : blueRectangle)});
  width: 66px;
  height: 23px;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.08;
  letter-spacing: normal;
  text-align: center;
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ClearButton = styled('button')`
  border: none;
  cursor: pointer;
  outline: none;
  overflow: none;
  background-color: Transparent;
  background-repeat: no-repeat;
`;
