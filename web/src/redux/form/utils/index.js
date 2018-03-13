import _ from 'lodash';

/** Simply translate the error(s) without any formatting. */
export const formatError = (error, t) => (Array.isArray(error) ?
  _.map(error, err => t(err)) :
  t(error));


/** Simply translate the warning(s) without any formatting. */
export const formatWarning = formatError;
