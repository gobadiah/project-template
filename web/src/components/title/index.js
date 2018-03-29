import React from 'react';

import { Link } from '~/routes';

import { defaultPropTypes } from '~/components';

import logo from '~/images/logo.png';

import {
  MainDiv,
  Company,
  Kin,
  Cube,
  logo as logoClassName,
} from './styles';

const Title = () => (
  <MainDiv>
    <Link route='index'>
      <img alt='KinCube' src={logo} className={logoClassName} />
    </Link>
    <Company>
      <Kin />
      <Cube />
    </Company>
  </MainDiv>
);

Title.propTypes = {
};

Title.defaultProps = {
};

Title.contextTypes = defaultPropTypes;

export default Title;
