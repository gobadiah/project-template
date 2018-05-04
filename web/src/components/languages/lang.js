import React from 'react';
import { string } from 'prop-types';

import { defaultPropTypes } from '~/components';

import fr from './images/fr.png';
import en from './images/en.png';

const flags = {
  fr,
  en,
};

const Lang = ({ lng }) => (
  <img alt={lng} src={flags[lng]} css='width: 100%;' />
);

Lang.propTypes = {
  lng: string.isRequired,
};

Lang.defaultProps = {
};

Lang.contextTypes = defaultPropTypes;

export default Lang;
