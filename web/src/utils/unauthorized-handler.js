import _ from 'lodash';

import { Router } from '~/routes';

const unauthorizedHandler = ({
  res,
  asPath,
  err,
  needsLogin,
}) => {
  if (_.get(err, 'response.status') !== 401) {
    throw err;
  }
  if (needsLogin) {
    if (res) {
      res.redirect(302, `/signin?returnUrl=${asPath}`);
    } else {
      Router.replace(`/signin?returnUrl=${asPath}`);
    }
  }
};

export default unauthorizedHandler;
