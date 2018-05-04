import React from 'react';

import { Field } from 'redux-form';

import { required } from '~/utils/forms/validators';

import RenderField from './render-field';

export default props => (
  <Field
    key='email'
    name='email'
    component={RenderField}
    type='email'
    autoComplete='email'
    label='Email'
    validate={[required]}
    {...props}
  />
);
