import styled, { css } from 'react-emotion';

export const Button = styled('button')`
  width: 249px;
  height: 74px;
  border-radius: 36.5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 26px;
  font-weight: bold;
  line-height: 1.04;
  text-align: center;
  color: var(--white);
  cursor: pointer;
  outline: none;
  border: none;
`;

export const arrowRight = css`
  width: 20px;
  height: 11px;
`;

export const google = css`
  background-color: var(--pale-red);
`;

export const facebook = css`
  background-color: var(--dull-blue);
`;
