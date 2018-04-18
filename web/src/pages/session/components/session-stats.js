import React from 'react';
import { arrayOf, shape, string } from 'prop-types';

import { defaultPropTypes } from '~/components';

import { SessionStatsTable as Table } from './styles';

const SessionStats = ({ session, stats }, { t }) => (
  <Table>
    <thead>
      <tr>
        { stats.map(stat => <td key={stat}>{t(session.current_stats.data[stat].label)}</td>) }
      </tr>
    </thead>
    <tbody>
      <tr>
        { stats.map(stat => <td key={stat}>{session.current_stats.data[stat].display}</td>) }
      </tr>
    </tbody>
  </Table>
);

SessionStats.propTypes = {
  session: shape().isRequired,
  stats: arrayOf(string).isRequired,
};

SessionStats.defaultProps = {
};

SessionStats.contextTypes = defaultPropTypes;

export default SessionStats;
