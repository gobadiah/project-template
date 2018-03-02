import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { extractCritical } from 'emotion-server';
import nprogress from 'nprogress/nprogress.css';

import Sentry from '~/tags/sentry';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = extractCritical(page.html);
    return { ...page, ...styles };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  render() {
    return (
      // eslint-disable-next-line jsx-a11y/html-has-lang
      <html>
        <Head>
          { // eslint-disable-next-line react/no-danger
          }<style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          { // eslint-disable-next-line react/no-danger
          }<style dangerouslySetInnerHTML={{ __html: nprogress }} />
        </Head>
        <body>
          <Sentry />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
