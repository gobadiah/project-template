import styled from 'react-emotion';

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
