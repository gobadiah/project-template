import styled from 'react-emotion';

import { FlexColumn } from '~/styles';

export const Bg = styled('div')`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background-color: var(--dark-blue-grey);
`;

export const Container = styled(FlexColumn)`
  align-items: ${props => (props.right ? 'flex-start' : 'flex-end')};
`;

export const GreenBar = styled('div')`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background-color: var(--apple-green);
  position: relative;
  top: -${props => props.height}px;
`;

export const Label = styled('div')`
`;
