import styled from 'react-emotion';

import { Flex, FlexColumn } from '~/styles';

export const MainContainer = styled(FlexColumn)`
  width: 970px;
  height: 686px;
  background-color: var(--dark-blue-grey);
  box-shadow: inset 0 0 223px 0 rgba(0, 0, 0, 0.5);
  align-items: center;
  border-radius: 0px 0px 5px 5px;
`;

export const Title = styled(Flex)`
  height: 86px;
  width: 100%;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: var(--dark-blue-grey);
`;

export const VideoContainer = styled('div')`
  width: 810px;
  height: 500px;
  margin-top: 47px;
`;
