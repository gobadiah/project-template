import React from 'react';
import { arrayOf, bool, func, string } from 'prop-types';

import { SubmissionError } from 'redux-form';

import _ from 'lodash';

import { PureComponent } from '~/components/base';

/** Simply translate the error(s) without any formatting. */
export const formatError = (error, t) => (Array.isArray(error) ?
  _.map(error, err => t(err)) :
  t(error));


/** Simply translate the warning(s) without any formatting. */
export const formatWarning = formatError;

/** Handle form errors */
export const handleFormErrors = (err) => {
  if (!err || !err.response || !err.response.status || err.response.status !== 400) {
    throw err;
  }
  const errors = {
    _error: err.response.data.non_field_errors,
    ...err.response.data.errors,
  };
  throw new SubmissionError(errors);
};

/** Base form */
export class BaseForm extends PureComponent {
  getFields = () => {};

  render() {
    const {
      error,
      formatError, // eslint-disable-line no-shadow
      formatWarning, // eslint-disable-line no-shadow
      handleSubmit,
      pristine,
      reset,
      submitting,
      warning,
    } = this.props;
    const { t } = this.context;
    return (
      <form onSubmit={handleSubmit}>
        {this.getFields()}
        <input type='submit' value={t('Send')} disabled={submitting} />
        <input type='button' value={t('Reset')} disabled={pristine || submitting} onClick={reset} />
        {formatWarning(warning, t)}
        {formatError(error, t)}
      </form>
    );
  }
}

BaseForm.propTypes = {
  error: arrayOf(string),
  formatError: func,
  formatWarning: func,
  handleSubmit: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  reset: func.isRequired,
  warning: arrayOf(string),
};

BaseForm.defaultProps = {
  error: [],
  formatError,
  formatWarning,
  warning: [],
};
