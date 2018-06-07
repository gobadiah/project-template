import { string } from 'prop-types';
import React from 'react';

import { ProfilePicture, defaultPropTypes } from '~/components';
import { Link } from '~/routes';

import { Container, A } from './styles';

const MyAccount = ({ className }, { t, user }) => (
  <Container className={className}>
    <ProfilePicture picture={user.picture} side={35} />
    <Link route='account'>
      <A>{t('My account')}</A>
    </Link>
  </Container>
);

MyAccount.propTypes = {
  className: string,
};

MyAccount.defaultProps = {
  className: '',
};

MyAccount.contextTypes = defaultPropTypes;

export default MyAccount;
