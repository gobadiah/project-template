import React from 'react';

import { Main } from '~/components';
import { Page } from '~/components/base';
import hoc from '~/hoc';

import { KeyStats, RankingGraph, SessionsList } from './components';
import { Container, LeftPanel, RightPanel } from './styles';

class Home extends Page {
  render() {
    const { t } = this.props;
    return (
      <Main title={t('home:title')} noContainer >
        <Container>
          <LeftPanel>
            <KeyStats />
          </LeftPanel>
          <RightPanel>
          </RightPanel>
        </Container>
      </Main>
    );
  }
}

export default hoc('home')(Home);
