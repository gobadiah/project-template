import _ from 'lodash';

import { signinAction as signin, currentUser as currentUserSelector } from '~/auth';

import { read, redirect } from '~/utils';

const currentUser = ({
  asPath,
  req,
  res,
  store,
  needsLogin,
  ...args
}) => {
  if (req) {
    if (_.get(req, 'cookies.access_token')) {
      return read({
        res,
        asPath,
        store,
        needsLogin,
        ...args,
      })(p => p.then((result) => {
        store.dispatch(signin(result.body.data.id));
        return {
          user: currentUserSelector(store.getState()),
        };
      }))('/users/me?include=sessions');
    } else if (needsLogin) {
      redirect(res, `/signin?returnUrl=${asPath}`);
    }
  } else {
    const props = { user: currentUserSelector(store.getState()) };
    if (needsLogin && !props.user) {
      redirect(undefined, `/signin?returnUrl=${asPath}`);
    } else {
      return props;
    }
  }
  return {};
};

export default currentUser;
