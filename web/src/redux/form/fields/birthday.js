import React from 'react';

import { Field } from 'redux-form';

import RenderField from './render-field';

export default () => (
  <Field
    name='birthday'
    component={RenderField}
    type='date'
    autoComplete='bday'
    label='Birthday'
  />
);
