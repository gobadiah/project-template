import _ from 'lodash';
import React from 'react';
import { bool, number, shape, string } from 'prop-types';

import { defaultPropTypes } from '~/components';

import { FlexColumn, Flex } from '~/styles';

import { Error, Warning } from '..';

const RenderField = ({
  autoComplete,
  className,
  cols,
  column,
  input,
  inputClassName,
  label,
  meta: {
    error,
    touched,
    warning,
  },
  placeholder,
  rows,
  type,
}, { t }) => {
  const container = column ? FlexColumn : Flex;
  const props = {
    autoComplete,
    className: inputClassName,
    key: 'component',
    placeholder,
    type,
    ...input,
  };
  const component = type === 'textarea' ?
    <textarea {...props} cols={cols} rows={rows} /> :
    <input {...props} />;
  return React.createElement(
    container,
    { className },
    _.compact([
      label && <label key='label' htmlFor={input.name}>{t(label)}</label>,
      component,
      touched && error && <Error key='error' error={error} />,
      touched && warning && <Warning key='warning' warning={warning} />,
    ]),
  );
};

RenderField.propTypes = {
  autoComplete: string,
  className: string,
  cols: number,
  column: bool,
  input: shape().isRequired,
  inputClassName: string,
  label: string,
  meta: shape().isRequired,
  placeholder: string,
  rows: number,
  type: string,
};

RenderField.defaultProps = {
  autoComplete: undefined,
  className: undefined,
  cols: 70,
  column: false,
  inputClassName: undefined,
  label: undefined,
  placeholder: undefined,
  rows: 7,
  type: 'text',
};

RenderField.contextTypes = defaultPropTypes;

export default RenderField;
