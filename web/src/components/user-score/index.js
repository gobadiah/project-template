import { bool, number, shape } from 'prop-types';
import React from 'react';

import { Flex, FlexColumn, Score, Small } from '~/styles';
import { defaultPropTypes } from '~/components';
import ProfilePicture from '~/components/profile-picture';

const UserScore = ({ user, right, height }) => (
  right ? (
    <Flex>
      <FlexColumn>
        <Small>{`${user.first_name} ${user.last_name}`}</Small>
        <Score right>1234</Score>
      </FlexColumn>
      <ProfilePicture user={user} side={height} />
    </Flex>
  ) : (
    <Flex>
      <ProfilePicture user={user} side={height} />
      <FlexColumn>
        <Small>{`${user.first_name} ${user.last_name}`}</Small>
        <Score>1234</Score>
      </FlexColumn>
    </Flex>
  )
);

UserScore.propTypes = {
  height: number.isRequired,
  user: shape().isRequired,
  right: bool,
};

UserScore.defaultProps = {
  right: false,
};

UserScore.contextTypes = defaultPropTypes;

export default UserScore;
