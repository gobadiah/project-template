import { arrayOf, func, shape } from 'prop-types';
import React from 'react';

import { Puce } from '~/styles';
import { defaultPropTypes } from '~/components';

import {
  GoToButton,
  KeyMomentsContainer as Container,
} from './styles';

const KeyMoments = ({ moments, onGoTo }) => (
  <Container>
    { moments.map(moment => (
      <GoToButton
        onClick={() => onGoTo(moment.time)}
        key={moment.id}
      >
        <Puce />
      </GoToButton>
    )) }
  </Container>
);

KeyMoments.propTypes = {
  moments: arrayOf(shape()).isRequired,
  onGoTo: func.isRequired,
};

KeyMoments.defaultProps = {
};

KeyMoments.contextTypes = defaultPropTypes;

export default KeyMoments;
