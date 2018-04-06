import _ from 'lodash';
import denormalizer, { removeCircularReferences } from 'json-api-denormalizer';

// eslint-disable-next-line import/prefer-default-export
export const currentUser = (state) => {
  const user = _.get(denormalizer(state.api), `users.${state.auth.get('userId')}`);
  if (user) {
    user.toJSON = removeCircularReferences(user);
  }
  return user;
};
