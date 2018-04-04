import _ from 'lodash';
import denormalizer, { removeCircularReferences } from 'json-api-denormalizer';

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
  let props;
  if (singular) {
    props = {
      [_.singularize(type)]: state[type][result.body.data.id],
    };
  } else {
    const ids = result.body.data.map(o => o.id);
    props = {
      [type]: ids.map(id => state[type][id]),
    };
  }
  props.toJSON = () => removeCircularReferences(result);
  return props;
}))(typeof endpoint === 'string' ? endpoint : endpoint(query));
