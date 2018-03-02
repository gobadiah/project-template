import React from 'react';
import PropTypes from 'prop-types';

import FR from './images/FR.png';
import EN from './images/EN.png';

const Language = (props, { i18n, t }) => (
  <div>
    <div><input type='button' onClick={() => i18n.changeLanguage('fr')} value={t('Switch to french')} /> <img src={FR} alt='' /></div>
    <div><input type='button' onClick={() => i18n.changeLanguage('en')} value={t('Switch to english')} /> <img src={EN} alt='' /></div>
  </div>
);

Language.contextTypes = {
  i18n: PropTypes.shape().isRequired,
  t: PropTypes.func.isRequired,
  user: PropTypes.shape(),
};

export default Language;
