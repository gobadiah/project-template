import React from 'react';
import { number } from 'prop-types';

import { defaultPropTypes } from '~/components';

import {
  Container,
  Main,
  Secondary,
} from './styles';

const Ranking = ({ main, secondary }) => (
  <Container>
    <Main>{main}</Main>
    <Secondary>{secondary}</Secondary>
  </Container>
);

Ranking.propTypes = {
  main: number.isRequired,
  secondary: number.isRequired,
};

Ranking.defaultProps = {
};

Ranking.contextTypes = defaultPropTypes;

export default Ranking;
