import React from 'react';
import { bool } from 'prop-types';
import styled, { css } from 'react-emotion';

import { ClearButton, Flex } from '~/styles';

import facebook from './images/facebook.png';
import google from './images/google.png';

export const AccountRow = styled(Flex)`
  margin-top: 23px;
  align-items: center;
  & > * {
    flex-grow: 0.07;
  }
`;

export const AccountTightRow = styled(AccountRow)`
  margin-top: 15px;
`;

export const AccountPictureLabel = styled('label')`
  margin-left: 25px;
`;

export const AccountRequiredFields = styled('div')`
  align-self: right;
  text-align: right;
`;

export const AccountSocialDiv = styled(Flex)`
  margin-left: auto;
`;

export const uploaderClassName = css`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;


const size = 20;

const linkedClassName = css`
  opacity: 1;
`;

const common = css`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GoogleButton = ({ linked }) => (
  <ClearButton
    css={`
      background-color: var(--pale-red);
      ${common}
      ${linked && linkedClassName}
    `}
  >
    <img
      src={google}
      alt=''
      css={`
        width: ${size}px;
        height: ${size}px;
      `}
    />
  </ClearButton>
);

GoogleButton.propTypes = {
  linked: bool.isRequired,
};

export const FacebookButton = ({ linked }) => (
  <ClearButton
    css={`
      background-color: var(--dull-blue);
      ${common}
      ${linked && linkedClassName}
    `}
  >
    <img
      src={facebook}
      alt=''
      css={`
        width: ${size}px;
        height: ${size}px;
      `}
    />
  </ClearButton>
);

FacebookButton.propTypes = {
  linked: bool.isRequired,
};
