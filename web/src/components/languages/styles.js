import styled, { css } from 'react-emotion';

import { Flex } from '~/styles';

export const size = `
  width: 133px;
  height: 60px;
`;

export const Menu = styled('div')`
  position: relative;
  ${size};
`;

export const SubMenu = styled('div')`
 visibility: hidden;
 opacity: 0;
 top: 100%;
 left: 0;
 width: 100%;
 transform: translateY(-2em);
 z-index: -1;
 transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;

 ${Menu}:hover &,
 ${Menu}:focus &,
 ${Menu}:focus-within & {
  visibility: visible; /* shows languages-submenu */
  opacity: 1;
  z-index: 1;
  transform: translateY(0%);
  transition-delay: 0s, 0s, 0.3s;
}
`;

export const button = css`
  background-color: Transparent;
  border: none;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  padding: 0;
  ${size}
`;

export const LangContainer = styled(Flex)`
  width: 133px;
  height: 39px;
  position: relative;
  align-items: center;
  ${props => !props.main && `
    opacity: 0.9;
    border-radius: 5px;
    background-color: var(--dark-blue-grey);
    &:hover {
      background-color: var(--white);
      & > * {
        color: var(--dark-blue-grey);
      }
    }
  `};
`;

export const LangFlag = styled('img')`
  max-width: 33px;
  max-height: 24px;
  margin-left: 23px;
`;

export const LangBG = styled('img')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const LangName = styled('span')`
  width: 33px;
  height: 27px;
  font-size: 26px;
  margin-left: 7px;
  margin-right: 10px;
  font-weight: bold;
  opacity: 0.5;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.04;
  letter-spacing: normal;
  text-align: left;
  color: var(--white);
`;

export const LangDropdown = styled('img')`
  width: 10px;
  height: 8px;
`;
