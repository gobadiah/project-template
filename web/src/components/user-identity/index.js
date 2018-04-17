import { shape } from 'prop-types';
import React from 'react';

import { Flex } from '~/styles';
import { GreenHyphen, Small } from '~/styles/styled-components';
import { age } from '~/utils';
import { defaultPropTypes } from '~/components';
import ProfilePicture from '~/components/profile-picture';

import { Age, BottomContainer, Ranking, RightContainer, pictureSide } from './styles';

const UserIdentity = ({ user }, { t }) => (
  <Flex>
    <ProfilePicture picture={user.picture} side={pictureSide} />
    <RightContainer>
      <Small>{`${user.first_name} ${user.last_name}`}</Small>
      <BottomContainer>
        <Age>{ age(t, user.birthday) }</Age>
        <GreenHyphen />
        <Ranking>{ user.ranking }</Ranking>
      </BottomContainer>
    </RightContainer>
  </Flex>
);

UserIdentity.propTypes = {
  user: shape().isRequired,
};

UserIdentity.defaultProps = {
};

UserIdentity.contextTypes = defaultPropTypes;

export default UserIdentity;
