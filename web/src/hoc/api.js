import { setAxiosConfig } from 'redux-json-api';

import { config } from '~/services/axios';

export default (args) => {
  const { req, store } = args;
  if (req) {
    store.dispatch(setAxiosConfig(config({ req })));
  }
};
