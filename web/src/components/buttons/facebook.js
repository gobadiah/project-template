import React from 'react';

import { Router } from '~/routes';

import RoundButton from './round';

import src from './images/facebook.png';

import { facebook as className } from './styles';

export default () => (
  <RoundButton
    src={src}
    text='Facebook'
    className={className}
    onClick={() => Router.push('/auth/facebook')}
  />
);
