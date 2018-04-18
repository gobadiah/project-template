import React from 'react';

import { Field } from 'redux-form';

import RenderField from './render-field';

export default () => (
  <Field
    name='ranking'
    component={RenderField}
    type='text'
    label='Ranking'
  />
);
