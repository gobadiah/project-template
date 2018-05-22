import React from 'react';

import { HorizontalSeparation, Normal } from '~/styles';
import { Page } from '~/components/base';
import { Score, Main } from '~/components';
import { score } from '~/tennis/fixtures';
import hoc from '~/hoc';

import { PlayersStats, Sections, SessionStats, SessionTitle, HeatMap } from './components';
import { UserScores, WatchVideo, containerWidth } from './styles';

const statsBySection = {
  0: ['maxservicespeed',
    'meanservicespeed',
    'maxforehandspeed',
    'maxbackhandspeed',
    'distanceplayer',
    'winpercentage'],
  1: ['winpercentage',
    'winningonserv',
    'winningonreturn',
    'winonbackhand',
    'winonforehand',
    'ace',
    'lostonbackhand',
    'lostonforehand',
    'lostonserv'],
  2: [],
  3: [],
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
      t('session:HEAT MAP'),
    ];


    let sectionInfo;
    if (currentSection !== 3) {
      sectionInfo = (
        <PlayersStats
          stats={statsBySection[currentSection]}
          session={session}
        />
      );
    } else {
      sectionInfo = (
        <HeatMap
          stats={statsBySection[currentSection]}
          session={session}
        />
      );
    }

    const player1Name = `${session.players[0].data['first-name']}
    ${session.players[0].data['last-name']}`;
    const player2Name = `${session.players[1].data['first-name']}

    ${session.players[1].data['last-name']}`;
    return (

      <Main title={t('session:title', { session })} width={containerWidth}>
        <SessionTitle session={session} />
        <HorizontalSeparation />
        <UserScores>

          <Normal> {player1Name} </Normal>
          <Score score={score} />
          <Normal> {player2Name} </Normal>
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
        {sectionInfo}
      </Main>
    );
  }
}

export default hoc(
  'session',
  {
    endpoint: query => `/tennis/sessions/${query.id}?include=videos,
  current_stats,players,exchanges,exchanges.hits`,
  },
)(Session);
