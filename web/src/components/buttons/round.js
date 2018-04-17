import React from 'react';
import { func, string } from 'prop-types';

import { defaultPropTypes } from '~/components';

import arrowRight from './images/arrow-right.png';

import {
  Button,
  arrowRight as arrowRightClassName,
  imgLeft,
} from './styles';

const RoundButton = ({
  className,
  src,
  text,
  onClick,
}) => (
  <Button className={className} onClick={onClick}>
    { src && <img src={src} alt='' className={imgLeft} /> }
    <span>{text}</span>
    <img
      src={arrowRight}
      alt=''
      className={arrowRightClassName}
    />
  </Button>
);

RoundButton.propTypes = {
  className: string,
  src: string,
  text: string,
  onClick: func,
};

RoundButton.defaultProps = {
  className: '',
  src: undefined,
  text: '',
  onClick: undefined,
};

RoundButton.contextTypes = defaultPropTypes;

export default RoundButton;
