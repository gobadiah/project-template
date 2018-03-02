import config from './index';

let clientInstance;
let serverInstance;

const getRavenInstance = () => {
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

export default getRavenInstance;
