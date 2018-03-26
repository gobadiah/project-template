import { readEndpoint } from 'redux-json-api';
import _ from 'lodash';
import denormalizer from 'json-api-denormalizer';

import { signin, currentUser as currentUserSelector } from '~/auth';

import { unauthorizedHandler } from '~/utils';

const currentUser = ({
  res,
  req,
  asPath,
  needsLogin,
  store,
}) => (_.get(req, 'cookies.access_token') ?
  store.dispatch(readEndpoint('/users/me'))
    .then((result) => {
      store.dispatch(signin(result.body.data.id));
      const user = denormalizer(store.getState().api)
        .users[store.getState().auth.get('userId')];
      return {
        user,
      };
    }).catch(err => unauthorizedHandler({
      err,
      res,
      asPath,
      needsLogin,
    }))
  : currentUserSelector(store.getState()));

export default currentUser;
