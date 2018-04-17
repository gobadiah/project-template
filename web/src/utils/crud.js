import NProgress from 'nprogress';
import { toast } from 'react-toastify';
import {
  createResource,
  readEndpoint,
  updateResource,
  deleteResource,
} from 'redux-json-api';

import { unauthorizedHandler } from '~/utils';

/* WIP: There may be a better way to handle this.
 * We would like to provide a Promise where some common error are handled, but prevent further
 * then to be executed. If we just return a promise witch a catch, common errors (which are handled
 * in the catch and don't re-throw) will not prevent further then down the chain to be executed.
 * We therefore force the user to provide handler (with they ".then chaining") to be executed
 * before ou catch.
 */
export const wrapper = func => ({
  asPath,
  dispatch,
  needsLogin,
  res,
  store,
  successMessage,
  errorMessage,
}) => (handler = p => p) => (...args) => {
  if (!res) {
    NProgress.start();
  }
  return handler((dispatch || store.dispatch)(func(...args)).then((result) => {
    if (!res) {
      NProgress.done();
      if (successMessage) {
        toast.success(successMessage);
      }
    }
    return result;
  })).catch((err) => {
    if (!res) {
      NProgress.done();
      if (errorMessage) {
        toast.error(errorMessage);
      }
    }
    return unauthorizedHandler({
      err,
      res,
      asPath,
      needsLogin,
    });
  });
};

export const create = wrapper(createResource);
export const read = wrapper(readEndpoint);
export const update = wrapper(updateResource);
export const destroy = wrapper(deleteResource);
