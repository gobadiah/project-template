import { shape } from 'prop-types';
import React from 'react';

import {
  BackArrow,
  ClearButton,
  Flex,
  Small,
  VerticalSeparation,
} from '~/styles';
import { Link } from '~/routes';
import { defaultPropTypes } from '~/components';

const SessionTitle = ({ session }) => (
  <Flex>
    <Link route='home'>
      <ClearButton>
        <BackArrow />
      </ClearButton>
    </Link>
    <VerticalSeparation />
    <Small>{session.label || 'Session'}</Small>
  </Flex>
);

SessionTitle.propTypes = {
  session: shape().isRequired,
};

SessionTitle.defaultProps = {
};

SessionTitle.contextTypes = defaultPropTypes;

export default SessionTitle;
