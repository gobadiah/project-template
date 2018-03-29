import _ from 'lodash';
import denormalizer from 'json-api-denormalizer';

// eslint-disable-next-line import/prefer-default-export
export const currentUser = state =>
  _.get(denormalizer(state.api), `users.${state.auth.get('userId')}`);
