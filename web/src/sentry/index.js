import { config, getRaven } from './config';

export { default as Sentry } from './tag';

export const capture = err => (
  err &&
  config.sentry.DSN &&
  !config.dev &&
  getRaven().captureException(err)
);
