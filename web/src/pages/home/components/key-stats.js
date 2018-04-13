import React from 'react';

import { Puce } from '~/styles/styled-components';
import { Ranking, StatBar, defaultPropTypes } from '~/components';
import UserIdentity from '~/components/user-identity';

import {
  KeyStatsContainer,
  KeyStatsTitle,
  Normal,
  statBarWidth,
} from './styles';

const KeyStats = (props, { t, user }) => (
  <KeyStatsContainer>
    <UserIdentity user={user} />
    <KeyStatsTitle>
      <Puce />
      <Normal css='margin-left: 5px'>{t('Kincube ranking')}</Normal>
    </KeyStatsTitle>
    <Ranking main={3456} secondary={12322} />
    <KeyStatsTitle>
      <Puce />
      <Normal>{t('Key stats')}</Normal>
    </KeyStatsTitle>
    <StatBar label='Coups droits' width={statBarWidth} ratio={0.6} />
  </KeyStatsContainer>
);

KeyStats.propTypes = {
};

KeyStats.defaultProps = {
};

KeyStats.contextTypes = defaultPropTypes;

export default KeyStats;
