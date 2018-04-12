import { shape, func } from 'prop-types';

export const defaultPropTypes = {
  i18n: shape().isRequired,
  t: func.isRequired,
  user: shape(),
};

export const defaultProps = {
  user: undefined,
};
