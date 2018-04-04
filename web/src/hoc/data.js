import _ from 'lodash';
import denormalizer from 'json-api-denormalizer';

import { read } from '~/utils';

_.mixin(require('lodash-inflection'));

export default ({
  endpoint,
  store,
  query,
  ...args
}) => endpoint && read({ query, store, ...args })(p => p.then((result) => {
  const singular = !Array.isArray(result.body.data);
  const type = singular ? _.get(result, 'body.data.type') : _.get(result, 'body.data.0.type');
  const state = denormalizer(store.getState().api);
  console.log(result.body);
  if (singular) {
    return {
      [_.singularize(type)]: state[type][result.body.data.id],
    };
  }
  const ids = result.body.data.map(o => o.id);
  return {
    [type]: ids.map(id => state[type][id]),
  };
}))(typeof endpoint === 'string' ? endpoint : endpoint(query));
