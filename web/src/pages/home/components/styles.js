import styled from 'react-emotion';

import {
  Normal as BaseNormal,
  Small as BaseSmall,
  WhiteBox,
} from '~/styles/styled-components';
import { Flex } from '~/styles';

export const KeyStatsContainer = styled(WhiteBox)`
`;

export const KeyStatsTitle = styled(Flex)`
  align-items: center;
  margin-top: 31px;
`;

export const statBarWidth = 292;

export const SessionsListTable = styled('table')`
  width: 90%;
  margin: 0 auto;
`;

export const SessionsListTHead = styled('thead')`
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.69;
  letter-spacing: normal;
  text-align: left;
  color: var(--bluish-grey);
`;

export const SessionsListTBody = styled('tbody')`
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: var(--dark-blue-grey);
`;

export const Normal = styled(BaseNormal)`
  margin-left: 5px;
`;

export const Small = styled(BaseSmall)`
  margin-left: 5px;
`;

export const SessionTitle = styled(Flex)`
  align-items: center;
`;
