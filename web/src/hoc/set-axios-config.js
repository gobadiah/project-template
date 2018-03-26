import { setAxiosConfig as sac } from 'redux-json-api';

import { config } from '~/services/axios';

const setAxiosconfig = ({ req, store }) => {
  store.dispatch(sac(config({ req })));
  return {};
};

export default setAxiosconfig;
