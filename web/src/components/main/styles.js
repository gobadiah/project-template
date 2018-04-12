import styled from 'react-emotion';

import { FlexColumn } from '~/styles';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled(FlexColumn)`
  align-items: center;
  margin: auto;
  margin-top: 49px;
  text-align: center;
  border-radius: 5px;
  padding-left: 38px;
  padding-right: 38px;
  background-color: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  ${props => props.width && `width: ${props.width}px;`}
`;
