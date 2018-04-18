import { setAxiosConfig } from 'redux-json-api';

import { config } from '~/services/axios';
import { create, read, update, destroy } from '~/utils';

export default args => ({
  setAxiosConfig: () => args.store.dispatch(setAxiosConfig(config())),
  create: create(args),
  read: read(args),
  update: update(args),
  destroy: destroy(args),
});
