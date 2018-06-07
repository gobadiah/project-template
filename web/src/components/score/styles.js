import styled, { css } from 'react-emotion';

import { FlexCenter } from '~/styles';

const common = css`
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.08;
  letter-spacing: normal;
  text-align: center;
`;

export const winner = css`
  ${common}
  color: var(--dark-blue-grey);
`;
export const loser = css`
  ${common}
  color: #828e9e;
  color: var(--bluish-grey);
`;

export const Td = styled('td')`
  width: 24px;
  height: 26px;
`;

export const Container = styled(FlexCenter)`
  position: relative;
  width: 150px;
`;

export const Building = styled('div')`
  position: absolute;
  top: 20px;
  left: 0;
  align: center;
  color: rgba(0, 0, 0, 0.3);
  transform: rotate(-15deg);
`;
