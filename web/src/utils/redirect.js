import { Router } from '~/routes';

const redirect = (to, res) => {
  if (res) {
    res.redirect(302, to);
  } else {
    Router.replace(to);
  }
};

export default redirect;
