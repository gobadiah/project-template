import React from 'react';

import { HorizontalSeparation, Normal } from '~/styles';
import { Page } from '~/components/base';
import { Score, Main } from '~/components';
import { score } from '~/tennis/fixtures';
import hoc from '~/hoc';

import { PlayersStats, Sections, SessionStats, SessionTitle, HeatMap } from './components';
import { UserScores, WatchVideo, containerWidth, userScoreHeight } from './styles';

const statsBySection = {
  0: ['service', 'service'],
  1: ['service'],
  2: ['service'],
  3: ['service'],
};

class Session extends Page {
  constructor(props) {
    super(props);

    this.state = {
      currentSection: 0,
    };
  }

  render() {
    const { session, t, user } = this.props;
    const { currentSection } = this.state;
    const sections = [
      t('session:KEY NUMBERS'),
      t('session:STATISTICS'),
      t('session:PERFORMANCES'),
      t('session:HEAT MAP')
    ];

    console.log(sections);
    console.log(currentSection);
    var sectionInfo;
    if (currentSection != 3){
        sectionInfo = <PlayersStats
                        stats={statsBySection[currentSection]}
                        session={session}
                      />;
    } else {
      sectionInfo = <HeatMap
                      stats={statsBySection[currentSection]}
                      session={session}
                    />;
    }
    console.log(sectionInfo);
    return (

      <Main title={t('session:title', { session })} width={containerWidth}>
        <SessionTitle session={session} />
        <HorizontalSeparation />
        <UserScores>
          <Normal> {session.players[0]['name']} </Normal>
          <Score score={score} />
          <Normal> {session.players[1]['name']} </Normal>
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
  { endpoint: query => `/tennis/sessions/${query.id}?include=videos,current_stats,players,exchanges,exchanges.hits` },
)(Session);
