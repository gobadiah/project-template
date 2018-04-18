import { shape } from 'prop-types';
import React from 'react';

import { BackArrow, ClearButton, Small, VerticalSeparation } from '~/styles';
import { Link } from '~/routes';
import { defaultPropTypes } from '~/components';

import { SessionTitleContainer as Container } from './styles';

const SessionTitle = ({ session }) => (
  <Container>
    <Link route='home'>
      <ClearButton>
        <BackArrow />
      </ClearButton>
    </Link>
    <VerticalSeparation />
    <Small>{session.label || 'Session'}</Small>
  </Container>
);

SessionTitle.propTypes = {
  session: shape().isRequired,
};

SessionTitle.defaultProps = {
};

SessionTitle.contextTypes = defaultPropTypes;

export default SessionTitle;
