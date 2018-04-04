import React from 'react';

import { Flex, HorizontalSeparation } from '~/styles';
import { Page } from '~/components/base';
import { Score, Main, UserScore } from '~/components';
import { score } from '~/tennis/fixtures';
import hoc from '~/hoc';
import { Link } from '~/routes';

import { Sections, SessionStats, SessionTitle } from './components';
import { userScoreHeight } from './styles';

class Session extends Page {
  render() {
    const { session } = this.props;
    const { t, user } = this.props;
    return (
      <Main title={t('session:title', { session })}>
        <SessionTitle session={session} />
        <HorizontalSeparation />
        <Flex>
          <UserScore user={user} height={userScoreHeight} />
          <Score score={score} />
          <UserScore user={user} right height={userScoreHeight} />
        </Flex>
        <Link route='video' params={{ id: session.videos[0].id }}>
          <a>{t('session:Watch the video')}</a>
        </Link>
        <HorizontalSeparation />
        <SessionStats
          session={session}
          stats={[
            'duration',
          ]}
        />
        <Sections />
      </Main>
    );
  }
}

export default hoc(
  'session',
  { endpoint: query => `/sessions/${query.id}?include=videos,current_stats` },
)(Session);
