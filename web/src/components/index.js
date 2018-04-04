import { shape, func } from 'prop-types';

export const defaultPropTypes = {
  i18n: shape().isRequired,
  t: func.isRequired,
  user: shape(),
};

export const defaultProps = {
  user: undefined,
};

export { default as Main } from './main';

export { default as GoogleButton } from './buttons/google';
export { default as FacebookButton } from './buttons/facebook';
export { default as StatBar } from './stat-bar';
export { default as Ranking } from './ranking';
export { default as UserScore } from './user-score';
export { default as Score } from './score';
