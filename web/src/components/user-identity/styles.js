import styled from 'react-emotion';

import { Flex, FlexColumn, Small } from '~/styles';

export const pictureSide = 87;

export const RightContainer = styled(FlexColumn)`
  margin-left: 17px;
  justify-content: space-around;
`;

export const BottomContainer = styled(Flex)`
  width: 163px;
  align-items: center;
`;

export const Age = styled(Small)`
  width: 80px;
`;

export const Ranking = styled(Small)`
  margin-left: 10px;
`;
