import React from 'react';
import { func, string } from 'prop-types';

import { defaultPropTypes } from '~/components';


import { Button } from './styles';

const OptionButton = ({
  className,
  text,
  onClick,
}) => (
  <Button className={className} onClick={onClick}>
    <span>{text}</span>
  </Button>
);

OptionButton.propTypes = {
  className: string,
  text: string,
  onClick: func,
};

OptionButton.defaultProps = {
  className: '',
  text: '',
  onClick: undefined,
};

OptionButton.contextTypes = defaultPropTypes;

export default OptionButton;
