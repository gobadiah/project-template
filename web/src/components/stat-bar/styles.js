import styled from 'react-emotion';

export const Bg = styled('div')`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background-color: var(--dark-blue-grey);
`;

export const GreenBar = styled('div')`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background-color: var(--apple-green);
  position: relative;
  top: -${props => props.height}px;
`;
