import _ from 'lodash';

import React from 'react';
import { array, shape, string, oneOfType } from 'prop-types';

import { defaultPropTypes } from '~/components';

const Warning = ({ warning }, { t }) => (Array.isArray(warning) ?
  _.map(warning, (err, i) => <div key={i}>{t(err)}</div>) :
  <div>{t(warning)}</div>);

Warning.propTypes = {
  warning: oneOfType([
    string,
    array,
    shape,
  ]).isRequired,
};

Warning.defaultProps = {
};

Warning.contextTypes = defaultPropTypes;

export default Warning;
