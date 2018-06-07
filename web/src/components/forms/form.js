import { node, oneOfType, arrayOf, func, string } from 'prop-types';
import React from 'react';

import { PureComponent } from '~/components/base';

import Error from './error';
import Warning from './warning';

class Form extends PureComponent {
  render() {
    const {
      children,
      className,
      error,
      handleSubmit,
      warning,
    } = this.props;
    return (
      <form onSubmit={handleSubmit} className={className}>
        {children}
        <Warning warning={warning} />
        <Error error={error} />
      </form>
    );
  }
}

Form.propTypes = {
  className: string,
  children: oneOfType([
    node,
    arrayOf(node),
  ]).isRequired,
  error: oneOfType([
    string,
    arrayOf(string),
  ]),
  handleSubmit: func.isRequired,
  warning: oneOfType([
    string,
    arrayOf(string),
  ]),
};

Form.defaultProps = {
  className: '',
  error: [],
  warning: [],
};

export default Form;
