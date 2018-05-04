import _ from 'lodash';

import React from 'react';
import { array, shape, string, oneOfType } from 'prop-types';

import { defaultPropTypes } from '~/components';

const Error = ({ error }, { t }) => (Array.isArray(error) ?
  _.map(error, (err, i) => <div key={i}>{t(err)}</div>) :
  <div>{t(error)}</div>);

Error.propTypes = {
  error: oneOfType([
    string,
    array,
    shape,
  ]).isRequired,
};

Error.defaultProps = {
};

Error.contextTypes = defaultPropTypes;

export default Error;
