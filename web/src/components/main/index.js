import {
  arrayOf,
  bool,
  node,
  oneOfType,
  string,
} from 'prop-types';
import Head from 'next/head';
import React from 'react';

import { defaultPropTypes } from '~/components';
import Title from '~/components/title';
import TitleBar from '~/components/title-bar';

import { Container } from './styles';

const Main = ({
  children,
  containerClassName,
  noContainer,
  title,
  titleBar,
}, { i18n, user }) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <Title i18n={i18n} user={user} />
    { noContainer ? children :
    <Container className={containerClassName}>
      { titleBar && <TitleBar title={titleBar} /> }
      { children }
    </Container>
    }
  </div>
);

Main.propTypes = {
  children: oneOfType([
    node,
    arrayOf(node),
  ]).isRequired,
  containerClassName: string,
  title: string.isRequired,
  titleBar: string,
  noContainer: bool,
};

Main.defaultProps = {
  containerClassName: '',
  titleBar: undefined,
  noContainer: false,
};

Main.contextTypes = defaultPropTypes;

export default Main;
