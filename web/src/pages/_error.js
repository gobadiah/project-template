import React from 'react';

import { capture } from '~/services/sentry';

const Error = () => <div>An error occured</div>;

Error.getInitialProps = ({ req, err }) => {
  if (req) {
    capture(err);
  }
  return {};
};

export default Error;
