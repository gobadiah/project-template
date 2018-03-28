import React from 'react';
import { oneOfType, arrayOf, node, string } from 'prop-types';
import Head from 'next/head';

import { defaultPropTypes } from '~/components';

const Main = ({ children, title, titleBar }, { i18n, user }) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <Title i18n={i18n} user={user}></Title>
    <div>
      { titleBar && <TitleBar title={titleBar} /> }
      { children }
    </div>
  </div>
);

Main.propTypes = {
  children: oneOfType([
    node,
    arrayOf(node),
  ]).isRequired,
  title: string.isRequired,
  titleBar: string,
};

Main.defaultProps = {
  titleBar: undefined,
};

Main.contextTypes = defaultPropTypes;

export default Main;
