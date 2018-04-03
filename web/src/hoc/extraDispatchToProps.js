import { setAxiosConfig } from 'redux-json-api';

import { config } from '~/services/axios';
import { create, destroy, read, update } from '~/utils';
import { register, signin } from '~/auth';

export default (dispatch, props) => {
  const { url: { asPath } } = props;
  return {
    setAxiosConfig: () => dispatch(setAxiosConfig(config())),
    create: create({ asPath, dispatch }),
    read: read({ asPath, dispatch }),
    update: update({ asPath, dispatch }),
    destroy: destroy({ asPath, dispatch }),
    signin: signin(dispatch),
    register: register(dispatch),
  };
};
