import { reduxForm } from 'redux-form';
import React from 'react';
import ReactS3Uploader from 'react-s3-uploader';

import {
  BirthdayField,
  EmailField,
  FemaleField,
  FirstNameField,
  LastNameField,
  LeftHandedField,
  MaleField,
  PasswordField,
  RankingField,
  RightHandedField,
} from '~/components/forms/fields';
import { defaultPropTypes } from '~/components';
import { Form } from '~/components/forms';
import { Line } from '~/styles';
import ProfilePicture from '~/components/profile-picture';
import config from '~/config';

import {
  AccountPictureLabel as PictureLabel,
  AccountRequiredFields as RequiredFields,
  AccountRow as Row,
  AccountSocialDiv as SocialDiv,
  AccountTightRow as TightRow,
  FacebookButton,
  GoogleButton,
  uploaderClassName,
} from './styles';

const change = () => {};

const AccountForm = (props, { t, user }) => (
  <Form>
    <ReactS3Uploader
      signingUrl='/auth/s3'
      signingUrlWithCredentials
      server={config.api}
      name='react-s3-uploader'
      id='react-s3-uploader'
      className={uploaderClassName}
      onFinish={result => change('picture', result.signedUrl.split('?')[0])}
    />
    <Row>
      <ProfilePicture user={user} />
      <PictureLabel htmlFor='react-s3-uploader'>{t('account: Upload a picture')}</PictureLabel>
      <SocialDiv>
        <GoogleButton />
        <FacebookButton />
      </SocialDiv>
    </Row>
    <Line />
    <RequiredFields>{t('Required fields')}</RequiredFields>
    <Row>
      <FirstNameField />
      <LastNameField />
    </Row>
    <Row>
      <EmailField />
    </Row>
    <Row>
      <PasswordField />
    </Row>
    <Row>
      <PasswordField />
      <PasswordField />
    </Row>
    <Row>
      <BirthdayField />
      <RankingField />
    </Row>
    <TightRow>
      <MaleField />
      <FemaleField />
    </TightRow>
    <TightRow>
      <LeftHandedField />
      <RightHandedField />
    </TightRow>
    <Line />
    <Row />
  </Form>
);

AccountForm.propTypes = {
};

AccountForm.defaultProps = {
};

AccountForm.contextTypes = defaultPropTypes;

export default reduxForm({
  form: 'AccountForm',
})(AccountForm);
