import React from 'react';
import { string } from 'prop-types';

import { Field } from 'redux-form';

import RenderField from './render-field';

const DominantHandField = ({ value, label, ...props }) => (
  <Field
    value={value}
    name='dominant_hand'
    component={RenderField}
    type='radio'
    label={label}
    {...props}
  />
);

DominantHandField.propTypes = {
  label: string.isRequired,
  value: string.isRequired,
};

export const LeftHandedField = props => (
  <DominantHandField
    value='left_handed'
    label='Left-handed'
    {...props}
  />
);

export const RightHandedField = props => (
  <DominantHandField
    value='right_handed'
    label='Right-handed'
    {...props}
  />
);
