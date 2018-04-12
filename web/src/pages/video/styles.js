import styled from 'react-emotion';

import { Flex, FlexColumnCenter } from '~/styles';

export const MainContainer = styled(FlexColumnCenter)`
  width: 970px;
  height: 686px;
  background-color: var(--dark-blue-grey);
  box-shadow: inset 0 0 223px 0 rgba(0, 0, 0, 0.5);
`;

export const Title = styled(Flex)`
  height: 86px;
`;

export const VideoContainer = styled('div')`
  width: 810px;
  height: 544px;
`;
