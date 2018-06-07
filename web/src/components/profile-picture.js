import React from 'react';
import { number, shape } from 'prop-types';

import { defaultPropTypes } from '~/components';

const ProfilePicture = ({ side, picture }, { t }) => (
  picture ?
    <img
      alt={t('Profile picture')}
      src={picture.url}
      css={`
        width: ${side}px;
        height: ${side}px;
        background-color: rgb(125, 125, 125);
        border-radius: 50%;
      `}
    /> :
    <div css={`width: ${side}px; height: ${side}px;`} />
);

ProfilePicture.propTypes = {
  side: number.isRequired,
  picture: shape(),
};

ProfilePicture.defaultProps = {
  picture: undefined,
};

ProfilePicture.contextTypes = defaultPropTypes;

export default ProfilePicture;
