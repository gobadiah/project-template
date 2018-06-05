import React from 'react';
import { func, string, bool } from 'prop-types';

import { defaultPropTypes } from '~/components';


import { Button } from './styles';

/* const OptionButton = ({
  className,
  text,
  isClicked,
  onClick,
}) => (
  if isClicked {
    return
    <Button className={className} onClick={onClick}>
      <span>{text}</span>
    </Button>
  } else {
    return
    <Button className={className} onClick={onClick}>
      <span>{text}</span>
    </Button>
  }

); */


function OptionButton(props) {
  if (props.isClicked) {
    return (
      <Button className={props.className} onClick={props.onClick}>
        <span>{props.text}</span>
      </Button>);
  }

  return (
    <Button
      style={
        {
          color: 'gray',
          backgroundColor: 'lightgray',
        }}
      className={props.className}
      onClick={props.onClick}
    >
      <span>{props.text}</span>
    </Button>
  );
}

OptionButton.propTypes = {
  className: string,
  text: string,
  onClick: func,
  isClicked: bool,
};

OptionButton.defaultProps = {
  className: '',
  text: '',
  onClick: undefined,
  isClicked: true,
};

OptionButton.contextTypes = defaultPropTypes;

export default OptionButton;
