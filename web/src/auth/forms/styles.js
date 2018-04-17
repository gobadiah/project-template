import { bool } from 'prop-types';
import React from 'react';
import styled, { css } from 'react-emotion';

import { ClearButton, Flex, Line } from '~/styles';
import { RoundButton } from '~/components';

import facebook from './images/facebook.png';
import google from './images/google.png';

export const AccountFirstRow = styled(Flex)`
  margin-top: 23px;
  align-items: center;
`;

export const AccountRow = styled(Flex)`
  margin-top: 23px;
  align-items: center;
  & > * {
    flex-grow: 1;
  }
  & > div:nth-child(2) {
    margin-left: 16px;
  }
`;

export const AccountLastRow = styled(AccountRow)`
  margin-bottom: 42px;
`;

export const AccountTightRow = styled(AccountRow)`
  margin-top: 15px;
  & > * {
    flex-grow: 1;
  }
`;

export const AccountPictureLabel = styled('label')`
  margin-left: 25px;
`;

export const AccountRequiredFields = styled('div')`
  align-self: right;
  text-align: right;
  width: 100%;
  height: 27px;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.69;
  letter-spacing: normal;
  color: var(--dark-blue-grey);
  margin: 0;
  padding: 0;
`;

export const AccountLine = styled(Line)`
  margin-top: 19px;
  margin-bottom: 5px;
`;

export const AccountSocialDiv = styled(Flex)`
  margin-left: auto;
`;

export const AccountSubmit = styled(RoundButton)`
  width: 288px;
`;

export const AccountReset = styled(ClearButton)`
  width: 200px;
  height: 27px;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.35;
  letter-spacing: normal;
  text-align: center;
  text-decoration: underline;
  color: var(--dark-blue-grey);
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
        max-width: ${size}px;
        max-height: ${size}px;
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
        max-width: ${size}px;
        max-height: ${size}px;
      `}
    />
  </ClearButton>
);

FacebookButton.propTypes = {
  linked: bool.isRequired,
};

export const signInClassName = css`
  width: 520px;
  & > * {
    margin-bottom: 23px;
  }
`;

export const ForgottenPassword = styled('a')`
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.35;
  letter-spacing: normal;
  text-align: left;
  cursor: pointer;
  text-decoration: underline;
  color: var(--dark-blue-grey);
`;

export const BottomContainer = styled(Flex)`
  justify-content: space-around;
  align-items: center;
`;
