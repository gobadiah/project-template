import styled from 'react-emotion';

import { Flex, FlexColumn } from '~/styles';

export const Container = styled(Flex)`
  margin: auto;
  width: 969px;
  justify-content: space-between;
`;

export const LeftPanel = styled(FlexColumn)`
  width: 393px;
`;

export const RightPanel = styled(FlexColumn)`
  width: 559px;
`;
