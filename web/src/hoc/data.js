import _ from 'lodash';
import denormalizer from 'json-api-denormalizer';

import { read } from '~/utils';

_.mixin(require('lodash-inflection'));

export default ({
  endpoint,
  store,
  query,
  ...args
}) => {
  return endpoint && read({ query, store, ...args })(p => p.then((result) => {
    console.log('result', result.body.data);
    const singular = !Array.isArray(result.body.data);
    const type = singular ? _.get(result, 'body.data.type') : _.get(result, 'body.data.0.type');
    const state = denormalizer(store.getState().api);
    console.log('state', state);
    console.log('type', type);
    console.log('singular', singular);
    console.log('query.id', query.id, _.get(args, 'query.id'));
    if (singular) {
      return {
        [_.singularize(type)]: state[type][query.id],
      };
    }
    return {
      [type]: state[type],
    };
  }))(endpoint(query));
};
