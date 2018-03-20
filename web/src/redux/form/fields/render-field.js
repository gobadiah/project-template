import React from 'react';
import { bool, func, number, shape, string } from 'prop-types';

import { defaultPropTypes } from '~/components';

import { FlexColumn, Flex } from '~/styles';

import {
  formatError as defaultFormatError,
  formatWarning as defaultFormatWarning,
} from '../utils';

const RenderField = ({
  autoComplete,
  className,
  cols,
  column,
  formatError,
  formatWarning,
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
    [
      label && <label key='label' htmlFor={input.name}>{t(label)}</label>,
      component,
      touched && error && <div key='error'>{formatError(error, t)}</div>,
      touched && warning && <div key='warning'>{formatWarning(warning, t)}</div>,
    ],
  );
};

RenderField.propTypes = {
  autoComplete: string,
  className: string,
  cols: number,
  column: bool,
  formatError: func,
  formatWarning: func,
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
  formatError: defaultFormatError,
  formatWarning: defaultFormatWarning,
  inputClassName: undefined,
  label: undefined,
  placeholder: undefined,
  rows: 7,
  type: 'text',
};

RenderField.contextTypes = defaultPropTypes;

export default RenderField;
