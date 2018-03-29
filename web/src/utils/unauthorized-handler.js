import _ from 'lodash';

import redirect from '~/utils/redirect';

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
    redirect(`/signin?returnUrl=${asPath}`, res);
  }
};

export default unauthorizedHandler;
