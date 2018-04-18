import styled, { css } from 'react-emotion';

export const Button = styled('button')`
  width: 249px;
  height: 74px;
  border-radius: 36.5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  font-size: 26px;
  font-weight: bold;
  line-height: 1.04;
  text-align: center;
  color: var(--white);
  cursor: pointer;
  outline: none;
  border: none;
  background-color: var(--dark-blue-grey);
`;

export const arrowRight = css`
  width: 20px;
  height: 11px;
  position: absolute;
  right: 17px;
`;

export const imgLeft = css`
  max-width: 20px;
  max-height: 20px;
  position: absolute;
  left: 24px;
`;

export const google = css`
  background-color: var(--pale-red);
`;

export const facebook = css`
  background-color: var(--dull-blue);
`;
