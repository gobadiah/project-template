import { arrayOf, bool, shape, string } from 'prop-types';
import React from 'react';

import { StatBar, defaultPropTypes } from '~/components';
import { VerticalSeparation } from '~/styles';

import {
  PlayersStatsContainer as Container,
  PlayersStatsLabel as Label,
  PlayersStatsValues as Values,
  StatContainer,
  StatDisplay,
  StatColumn,
  statBarWidth,
} from './styles';

const Stat = ({ stat, right }) => (
  <StatContainer right={right}>
    <StatDisplay right={right}>{stat.display}</StatDisplay>
    <StatBar right={right} width={statBarWidth} ratio={stat.normalized} />
  </StatContainer>
);

Stat.propTypes = {
  stat: shape().isRequired,
  right: bool,
};

Stat.defaultProps = {
  right: false,
};

Stat.contextTypes = defaultPropTypes;

const PlayersStats = ({ session, stats }, { t }) => (
  <Container>
    { stats.map(stat => (
      <StatColumn key={stat}>
        <Label>{t(session.current_stats.data[stat][session.players[0].id].label)}</Label>
        <Values>
          <Stat stat={session.current_stats.data[stat][session.players[0].id]} />
          <VerticalSeparation />
          <Stat stat={session.current_stats.data[stat][session.players[1].id]} right />
        </Values>
      </StatColumn>
    )) }
  </Container>
);

PlayersStats.propTypes = {
  session: shape().isRequired,
  stats: arrayOf(string).isRequired,
};

PlayersStats.defaultProps = {
};

PlayersStats.contextTypes = defaultPropTypes;

export default PlayersStats;
