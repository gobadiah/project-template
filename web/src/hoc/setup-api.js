import { setAxiosConfig } from 'redux-json-api';

import { config } from '~/services/axios';

export default ({ req, store }) => {
  if (req) {
    store.dispatch(setAxiosConfig(config({ req })));
  }
};
