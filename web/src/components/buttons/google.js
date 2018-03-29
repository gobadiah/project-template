import React from 'react';

import { Router } from '~/routes';

import RoundButton from './round';

import src from './images/google.png';

import { google as className } from './styles';

export default () => (
  <RoundButton
    src={src}
    text='Google'
    className={className}
    onClick={() => Router.push('/auth/google')}
  />
);
