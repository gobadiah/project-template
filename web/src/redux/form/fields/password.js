import React from 'react';

import { Field } from 'redux-form';

import RenderField from './render-field';

export default props => (
  <Field
    name='password'
    component={RenderField}
    type='password'
    autoComplete='current-password'
    label='Password'
    {...props}
  />
);
