import React from 'react';

import { Normal, Puce } from '~/styles/styled-components';
import { defaultPropTypes } from '~/components';
import UserIdentity from '~/components/user-identity';

import { KeyStatsContainer, KeyStatsTitle } from './styles';

const KeyStats = (props, { t, user }) => (
  <KeyStatsContainer>
    <UserIdentity user={user} />
    <KeyStatsTitle>
      <Puce />
      <Normal>{t('Kincube ranking')}</Normal>
    </KeyStatsTitle>
  </KeyStatsContainer>
);

KeyStats.propTypes = {
};

KeyStats.defaultProps = {
};

KeyStats.contextTypes = defaultPropTypes;

export default KeyStats;
