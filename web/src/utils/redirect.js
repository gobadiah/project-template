import { Router } from '~/routes';

const redirect = (res, to, params) => {
  if (res) {
    res.redirect(302, to);
  } else {
    Router.pushRoute(to, params);
  }
};

export default redirect;
