import React from 'react';

import { config } from './config';

export default () => (config.sentry.publicDSN && !config.dev ? [
  <script src='https://cdn.ravenjs.com/3.22.3/raven.min.js' crossOrigin='anonymous' />,
  // eslint-disable-next-line react/no-danger
  <script dangerouslySetInnerHTML={{ __html: `Raven.config('${config.publicDSN}').install();` }} />,
] : null);
