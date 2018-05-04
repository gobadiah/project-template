import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { extractCritical } from 'emotion-server';
import nprogress from 'nprogress/nprogress.css';
import toastify from 'react-toastify/dist/ReactToastify.css';

import { Sentry } from '~/services/sentry';

const removeSourceMaps = (source) => {
  /* The way we import css here (using babel inline-import plugin, cf .babelrc)
   * doesn't allow for requesting map, since the map file is usually not accessible through http.
   * We remove the sourceMappingURL here to prevent annoying useless extra request for mapping.
   */
  const remove = /sourceMappingURL=.*.map/;
  return source.replace(remove, '');
};

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
          }<style dangerouslySetInnerHTML={{ __html: removeSourceMaps(nprogress) }} />
          { // eslint-disable-next-line react/no-danger
          }<style dangerouslySetInnerHTML={{ __html: removeSourceMaps(toastify) }} />
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
