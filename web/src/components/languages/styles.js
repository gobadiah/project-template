import styled, { css } from 'react-emotion';

export const size = `
  width: 220px;
  height: 100px;
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
