import { node, oneOfType, arrayOf, bool, func, string } from 'prop-types';
import React from 'react';

import { PureComponent } from '~/components/base';

import Error from './error';
import Warning from './warning';

class Form extends PureComponent {
  render() {
    const {
      children,
      error,
      handleSubmit,
      pristine,
      reset,
      submitting,
      warning,
    } = this.props;
    const { t } = this.context;
    return (
      <form onSubmit={handleSubmit}>
        {children}
        <input type='submit' value={t('Send')} disabled={submitting} />
        <input type='button' value={t('Reset')} disabled={pristine || submitting} onClick={reset} />
        <Warning warning={warning} />
        <Error error={error} />
      </form>
    );
  }
}

Form.propTypes = {
  children: oneOfType([
    node,
    arrayOf(node),
  ]).isRequired,
  error: oneOfType([
    string,
    arrayOf(string),
  ]),
  handleSubmit: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  reset: func.isRequired,
  warning: oneOfType([
    string,
    arrayOf(string),
  ]),
};

Form.defaultProps = {
  error: [],
  warning: [],
};

export default Form;
