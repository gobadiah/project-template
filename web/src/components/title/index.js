import React from 'react';

import { Languages, MyAccount, defaultPropTypes } from '~/components';
import { Link } from '~/routes';
import logo from '~/images/logo.png';

import {
  MainDiv,
  Company,
  Kin,
  Cube,
  languages,
  logo as logoClassName,
  myAccount,
} from './styles';

const Title = (props, { user }) => (
  <MainDiv>
    { user && <MyAccount className={myAccount} /> }
    <Link route='index'>
      <img alt='KinCube' src={logo} className={logoClassName} />
    </Link>
    <Company>
      <Kin />
      <Cube />
    </Company>
    <Languages className={languages} />
  </MainDiv>
);

Title.propTypes = {
};

Title.defaultProps = {
};

Title.contextTypes = defaultPropTypes;

export default Title;
