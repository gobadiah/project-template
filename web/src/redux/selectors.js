import _ from 'lodash';
import denormalizer from 'json-api-denormalizer';

export const currentUser = state => _.get(denormalizer(state.api), `users.${state.auth.get('userId')}`);

export const a = 5;
