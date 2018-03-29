import { shape } from 'prop-types';
import React from 'react';

import { Flex, FlexColumn } from '~/styles';
import { GreenHyphen, Small } from '~/styles/styled-components';
import { defaultPropTypes } from '~/components';
import ProfilePicture from '~/components/profile-picture';
import { age } from '~/utils';

import { BottomContainer, pictureSide } from './styles';

const UserIdentity = ({ user }, { t }) => (
  <Flex>
    <ProfilePicture user={user} side={pictureSide} />
    <FlexColumn>
      <Small>{`${user.first_name} ${user.last_name}`}</Small>
      <BottomContainer>
        <Small>{ age(t, user.birthday) }</Small>
        <GreenHyphen />
        <Small>{ user.ranking }</Small>
      </BottomContainer>
    </FlexColumn>
  </Flex>
);

UserIdentity.propTypes = {
  user: shape().isRequired,
};

UserIdentity.defaultProps = {
};

UserIdentity.contextTypes = defaultPropTypes;

export default UserIdentity;
