import React from 'react';

import { Field } from 'redux-form';

import RenderField from './render-field';

export default () => (
  <Field
    name='first_name'
    component={RenderField}
    type='text'
    autoComplete='given-name'
    label='First name'
  />
);
