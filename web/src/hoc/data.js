import _ from 'lodash';
import denormalizer, { removeCircularReferences } from 'json-api-denormalizer';

import { read } from '~/utils';

_.mixin(require('lodash-inflection'));

const handleEndpoint = ({
  endpoint,
  store,
  query,
  ...args
}) => endpoint && read({ query, store, ...args })(p => p.then((result) => {
  const singular = !Array.isArray(result.body.data);
  const type = singular ? _.get(result, 'body.data.type') : _.get(result, 'body.data.0.type');
  const state = denormalizer(store.getState().api);
  let props;
  let key;
  if (singular) {
    key = _.camelCase(_.singularize(type));
    props = {
      [key]: state[type][result.body.data.id],
    };
    props[key].toJSON = () => removeCircularReferences(props[key]);
  } else {
    key = _.camelCase(type);
    const ids = result.body.data.map(o => o.id);
    props = {
      [key]: ids.map(id => state[type][id]),
    };
    props[key].forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.toJSON = () => removeCircularReferences(el);
    });
  }
  return props;
}))(typeof endpoint === 'string' ? endpoint : endpoint(query));

export default ({ endpoint, ...args }) => (endpoint && Array.isArray(endpoint) ?
  Promise.all(endpoint.map(ep => handleEndpoint({ ep, ...args }))) :
  handleEndpoint({ endpoint, ...args }));
