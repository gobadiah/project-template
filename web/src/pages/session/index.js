import React from 'react';

import { HorizontalSeparation, Normal } from '~/styles';
import { Page } from '~/components/base';
import { Score, Main } from '~/components';
import { score } from '~/tennis/fixtures';
import hoc from '~/hoc';

import { PlayersStats, Sections, SessionStats, SessionTitle } from './components';
import { UserScores, WatchVideo, containerWidth } from './styles';

const statsBySection = {
  0: ['service', 'service'],
  1: ['service'],
  2: [],
};

class Session extends Page {
  constructor(props) {
    super(props);

    this.state = {
      currentSection: 0,
    };
  }

  render() {
    const { session, t } = this.props;
    const { currentSection } = this.state;
    const sections = [
      t('session:KEY NUMBERS'),
      t('session:STATISTICS'),
      t('session:PERFORMANCES'),
    ];
    return (

      <Main title={t('session:title', { session })} width={containerWidth}>
        <SessionTitle session={session} />
        <HorizontalSeparation />
        <UserScores>
          <Normal> {session.players[0].name} </Normal>
          <Score score={score} />
          <Normal> {session.players[1].name} </Normal>
        </UserScores>
        <WatchVideo session={session} />
        <HorizontalSeparation />
        <SessionStats
          session={session}
          stats={[
            'duration',
          ]}
        />
        <Sections
          sectionIndex={currentSection}
          sections={sections}
          onSectionChange={index => this.setState({ currentSection: index })}
        />
        <PlayersStats
          stats={statsBySection[currentSection]}
          session={session}
        />
      </Main>
    );
  }
}

export default hoc(
  'session',
  { endpoint: query => `/tennis/sessions/${query.id}?include=videos,current_stats,players` },
)(Session);
