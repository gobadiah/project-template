import React from 'react';

import { defaultPropTypes } from '~/components';
import UserIdentity from '~/components/user-identity';

import { KeyStatsContainer } from './styles';

const KeyStats = (props, { user }) => (
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
