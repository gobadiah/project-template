import styled from 'react-emotion';

import { Flex, FlexCenter, FlexColumn, FlexColumnCenter } from '~/styles';

export const PlayersStatsContainer = styled(FlexColumnCenter)`
`;

export const PlayersStatsLabel = styled(FlexCenter)`
  width: 427px;
  height: 27px;
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.69;
  letter-spacing: normal;
  text-align: center;
  color: var(--dark-blue-grey);
`;

export const PlayersStatsValues = styled(FlexCenter)`
  height: 60px;
`;

export const statBarWidth = 300;

export const StatContainer = styled(FlexColumn)`
  flex-direction: ${props => (props.right ? 'flex-start' : 'flex-end')};
`;

export const StatDisplay = styled('div')`
  font-family: TitilliumWeb;
  font-size: 26px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.12;
  letter-spacing: normal;
  text-align: ${props => (props.right ? 'left' : 'right')};
  color: var(--dark-blue-grey);
`;

export const StatColumn = styled(FlexColumnCenter)`
  margin-top: 4px;
`;

export const SessionStatsTable = styled('table')`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 24px;

  thead {
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.69;
    letter-spacing: normal;
    text-align: left;
    color: var(--bluish-grey);
  }

  tbody {
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.97;
    letter-spacing: normal;
    text-align: left;
    color: var(--dark-blue-grey);
    font-size: 30px;
  }
`;

export const Section = styled('div')`
  text-align: center;
  width: 138px;
  height: 27px;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.69;
  letter-spacing: normal;
  text-align: center;
  color: var(--white);
`;

export const SectionsBar = styled(FlexCenter)`
  width: 970px;
  height: 48px;
  background-color: var(--dark-blue-grey);
`;

export const SelectedBar = styled('div')`
  width: 106px;
  height: 4px;
  background-color: var(--apple-green);
  ${props => props.hidden && 'display: none;'}
`;

export const SessionTitleContainer = styled(Flex)`
  align-items: center;
  margin-top: 22px;
  margin-bottom: 13px;
  align-self: flex-start;
`;

export const SectionsContainer = styled(FlexColumn)`
  width: 100%;
`;
