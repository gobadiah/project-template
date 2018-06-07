import React from 'react';
import { func, string, bool } from 'prop-types';
import { defaultPropTypes } from '~/components';


const OptionButton = ({
  selected,
  text,
  onClick,
  className,
}) => (

  <div>
    <button
      css='
        background-color: clear;
        border: 0;
      '
      className={className}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
    <div
      css={`
        background-color: ${selected ? 'var(--apple-green)' : 'grey'};
        width:120px;
        height:5px;
      `}
    />
  </div>
);


OptionButton.propTypes = {
  className: string,
  text: string,
  onClick: func,
  selected: bool,
};

OptionButton.defaultProps = {
  className: '',
  text: '',
  onClick: undefined,
  selected: true,
};

OptionButton.contextTypes = defaultPropTypes;

export default OptionButton;
