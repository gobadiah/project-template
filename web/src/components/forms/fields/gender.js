import React from 'react';
import { string } from 'prop-types';

import { Field } from 'redux-form';

import RenderField from './render-field';

export const GenderField = ({ value, label, ...props }) => (
  <Field
    value={value}
    name='gender'
    component={RenderField}
    type='radio'
    label={label}
    {...props}
  />
);

GenderField.propTypes = {
  label: string.isRequired,
  value: string.isRequired,
};

export const MaleField = props => <GenderField value='male' label='Male' {...props} />;
export const FemaleField = props => <GenderField value='female' label='Female' {...props} />;
