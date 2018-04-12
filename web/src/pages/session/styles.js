import { shape } from 'prop-types';
import React from 'react';
import styled from 'react-emotion';

import { Link } from '~/routes';
import { Flex } from '~/styles';
import { defaultPropTypes } from '~/components';

export const userScoreHeight = 62;

export const containerWidth = 970;

export const UserScores = styled(Flex)`
  margin-top: 31px;
  justify-content: space-between;
  width: 100%;
`;

export const WatchVideo = ({ session }, { t }) => (
  <Link route='video' params={{ id: session.videos[0].id }}>
    <a
      css='
        width: 220px;
        height: 27px;
        margin-bottom: 7px;
        font-size: 16px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.69;
        letter-spacing: normal;
        text-align: center;
        color: var(--dark-blue-grey);
      '
    >
      {t('session:Watch the video')}
    </a>
  </Link>
);

WatchVideo.propTypes = {
  session: shape().isRequired,
};

WatchVideo.contextTypes = defaultPropTypes;
