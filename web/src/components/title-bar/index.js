import React from 'react';
import { func, string } from 'prop-types';

import { defaultPropTypes } from '~/components';

import closeWhite from './images/closeWhite.png';

import {
  MainDiv,
  CloseButton,
  closeImg,
} from './styles';

const TitleBar = ({ onClose, title }) => (
  <MainDiv>
    <span>{title}</span>
    {
      onClose &&
      <CloseButton onClick={onClose}>
        <img src={closeWhite} alt='close' className={closeImg} />
      </CloseButton>
    }
  </MainDiv>
);

TitleBar.propTypes = {
  onClose: func,
  title: string.isRequired,
};

TitleBar.defaultProps = {
  onClose: undefined,
};

TitleBar.contextTypes = defaultPropTypes;

export default TitleBar;
