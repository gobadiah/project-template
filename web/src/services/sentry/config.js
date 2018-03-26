import config from '~/config';

let clientInstance;
let serverInstance;

config.sentry = {
  DSN: process.env.SENTRY_DSN,
  publicDSN: process.env.SENTRY_PUBLIC_DSN,
};

export { config };

export const getRaven = () => {
  const clientSide = typeof window !== 'undefined';

  if (clientSide) {
    if (!clientInstance) {
      const Raven = require('raven-js'); // eslint-disable-line global-require
      Raven.config(config.sentry.publicDSN).install();
      clientInstance = Raven;
    }

    return clientInstance;
  }

  if (!serverInstance) {
    // NOTE: raven (for node) is not bundled by webpack (see rules in next.config.js).
    const RavenNode = require('raven'); // eslint-disable-line global-require
    RavenNode.config(config.sentry.DSN).install();
    serverInstance = RavenNode;
  }
  return serverInstance;
};
