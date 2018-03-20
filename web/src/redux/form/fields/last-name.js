import React from 'react';

import { Field } from 'redux-form';

import RenderField from './render-field';

export default () => (
  <Field
    name='last_name'
    component={RenderField}
    type='text'
    autoComplete='family-name'
    label='Last name'
  />
);
