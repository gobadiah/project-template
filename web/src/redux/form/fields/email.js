import React from 'react';

import { Field } from 'redux-form';

import RenderField from './render-field';

import { required } from '../validators';

export default () => (
  <Field
    key='email'
    name='email'
    component={RenderField}
    type='email'
    autoComplete='email'
    label='Email'
    validate={[required]}
  />
);
