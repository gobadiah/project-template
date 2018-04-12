import React from 'react';

import { Main } from '~/components';
import { Page } from '~/components/base';
import hoc from '~/hoc';

import { Container, LeftPanel, RightPanel } from './styles';
import { KeyStats, RankingHistory, SessionsList } from './components';

class Home extends Page {
  render() {
    const { sessions, t } = this.props;
    console.log('props =', this.props);
    return (
      <Main title={t('home:title')} noContainer >
        <Container>
          <LeftPanel>
            <KeyStats />
          </LeftPanel>
          <RightPanel>
            <RankingHistory />
            <SessionsList sessions={sessions} />
          </RightPanel>
        </Container>
      </Main>
    );
  }
}

export default hoc('home', { endpoint: '/users/me/sessions' })(Home);
