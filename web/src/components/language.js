import React from 'react';
import {
  shape,
  func,
  string,
} from 'prop-types';

import FR from './images/FR.png';
import EN from './images/EN.png';

export const Lang = ({
  lng,
  name,
  img,
}, { i18n, t }) => (
  <div>
    <input type='button' onClick={() => i18n.changeLanguage(lng)} value={t(`Switch to ${name}`)} /> <img src={img} alt='' />
  </div>
);

Lang.contextTypes = {
  i18n: shape().isRequired,
  t: func.isRequired,
  user: shape(),
};

Lang.propTypes = {
  lng: string.isRequired,
  name: string.isRequired,
  img: string.isRequired,
};

const Language = (props, { i18n, t }) => (
  <div>
    <Lang i18n={i18n} t={t} lng='fr' name='french' img={FR} />
    <Lang i18n={i18n} t={t} lng='en' name='english' img={EN} />
  </div>
);

Language.contextTypes = {
  i18n: shape().isRequired,
  t: func.isRequired,
  user: shape(),
};

export default Language;
