import { bool, number, shape, string } from 'prop-types';
import React from 'react';
import _ from 'lodash';
import styled, { css } from 'react-emotion';

import { Flex, FlexColumn } from '~/styles';
import { defaultPropTypes } from '~/components';

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
    active,
    error,
    touched,
    warning,
  },
  rows,
  type,
  required,
}, { t }) => {
  const container = column ? FlexColumn : Flex;
  const id = type === 'radio' ? `${input.name}_${input.value}` : undefined;
  const req = required ? ' *' : '';
  const lab = `${t(label)}${req}`;
  const props = {
    autoComplete,
    className: `${inputClassName || ''} ${(type === 'radio' && css`width: 32px`) || ''}`,
    key: 'component',
    placeholder: lab,
    id,
    ...input,
  };
  const component = type === 'textarea' ?
    <textarea {...props} cols={cols} rows={rows} /> : (
      <input
        type={(type !== 'date' || input.value || active) ? type : 'text'}
        {...props}
      />
    );
  return React.createElement(
    styled(container)`
      align-items: center;
    `,
    { className },
    _.compact([
      component,
      type === 'radio' && <label key='label' htmlFor={id}>{lab}</label>,
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
  required: bool,
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
  required: false,
};

RenderField.contextTypes = defaultPropTypes;

export default RenderField;
