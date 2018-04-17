import { bool, string } from 'prop-types';
import React from 'react';

import { defaultPropTypes } from '~/components';

import { LangBG, LangContainer, LangDropdown, LangFlag, LangName } from './styles';
import bg from './images/languageSwitcherBG.png';
import dropdown from './images/dropdownArrow.png';
import en from './images/en.png';
import fr from './images/fr.png';

const flags = {
  fr,
  en,
};

const Lang = ({ lng, main }) => (
  <LangContainer main={main}>
    { main && <LangBG alt='' src={bg} /> }
    <LangFlag alt={lng} src={flags[lng]} css='width: 100%;' />
    <LangName>{lng.toUpperCase()}</LangName>
    { main && <LangDropdown alt='' src={dropdown} /> }
  </LangContainer>
);

Lang.propTypes = {
  lng: string.isRequired,
  main: bool,
};

Lang.defaultProps = {
  main: false,
};

Lang.contextTypes = defaultPropTypes;

export default Lang;
