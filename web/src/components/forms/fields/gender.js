import React from 'react';
import { string } from 'prop-types';

import { Field } from 'redux-form';

import RenderField from './render-field';

const GenderField = ({ label, value }) => (
  <Field
    value={value}
    name='gender'
    component={RenderField}
    type='radio'
    label={label}
  />
);

GenderField.propTypes = {
  label: string.isRequired,
  value: string.isRequired,
};

export const MaleField = <GenderField value='male' label='Male' />;
export const FemaleField = <GenderField value='female' label='Female' />;
