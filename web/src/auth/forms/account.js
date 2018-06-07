import { connect } from 'react-redux';
import { formValueSelector, reduxForm } from 'redux-form';
import { bool, func } from 'prop-types';
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
import { Form } from '~/components/forms';
import { defaultPropTypes } from '~/components';
import ProfilePicture from '~/components/profile-picture';
import config from '~/config';

import {
  AccountSubmit as Button,
  AccountReset as Reset,
  AccountFirstRow as FirstRow,
  AccountLastRow as LastRow,
  AccountLine as Line,
  AccountPictureLabel as PictureLabel,
  AccountRequiredFields as RequiredFields,
  AccountRow as Row,
  AccountSocialDiv as SocialDiv,
  AccountTightRow as TightRow,
  FacebookButton,
  GoogleButton,
  uploaderClassName,
} from './styles';

const AccountForm = ({
  change,
  create,
  selector,
  ...props
}, { t }) => {
  const createPicture = result => create(p => p.then((response) => {
    const value = {
      url: response.data.attributes.url,
      ...response.data,
    };
    change('picture', value);
  }))({
    type: 'assets',
    attributes: {
      url: result.signedUrl.split('?')[0],
    },
  });
  const picture = selector('picture');
  return (
    <Form {...props}>
      <ReactS3Uploader
        signingUrl='/auth/s3'
        signingUrlWithCredentials
        server={config.api}
        name='react-s3-uploader'
        id='react-s3-uploader'
        className={uploaderClassName}
        onFinish={createPicture}
      />
      <FirstRow>
        <ProfilePicture picture={picture} side={80} />
        <PictureLabel htmlFor='react-s3-uploader'>{t('account:Upload a picture')}</PictureLabel>
        <SocialDiv>
          <GoogleButton linked={false} />
          <FacebookButton linked={false} />
        </SocialDiv>
      </FirstRow>
      <Line />
      <RequiredFields>{t('* Required fields')}</RequiredFields>
      <Row>
        <FirstNameField />
        <LastNameField />
      </Row>
      <Row>
        <EmailField />
      </Row>
      <Row>
        <PasswordField name='old_password' />
      </Row>
      <Row>
        <PasswordField
          label='New password'
          autoComplete='new-password'
        />
        <PasswordField
          name='confirm_password'
          label='Password confirmation'
        />
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
      <LastRow>
        <Reset disabled={props.submitting || props.pristine} onClick={props.reset}>
          {t('Cancel')}
        </Reset>
        <Button text={t('Save')} />
      </LastRow>
    </Form>
  );
};

AccountForm.propTypes = {
  change: func.isRequired,
  create: func.isRequired,
  pristine: bool.isRequired,
  reset: func.isRequired,
  selector: func.isRequired,
  submitting: bool.isRequired,
};

AccountForm.defaultProps = {
};

AccountForm.contextTypes = defaultPropTypes;

const mapStateToProps = state => ({
  selector: key => formValueSelector('AccountForm')(state, key),
});

export default connect(mapStateToProps)(reduxForm({
  form: 'AccountForm',
})(AccountForm));
