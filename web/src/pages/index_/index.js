import React from 'react';

import { Link } from '~/routes';
import { Page } from '~/components/base';
import hoc from '~/hoc';

import Language from '~/components/language';
import SomePureComponent from '~/components/some-pure-component';

import s from './styles';

class Index extends Page {
  render() {
    const { t } = this.props;
    return (
      <div css='background-color: hotpink;'>
        <div className={s.helloWorld}>{t('index:Hello world')}</div>
        <Language />
        <SomePureComponent />
        <Link route='some-page'><a>Some page</a></Link>
        <Link route='generate-error'><a>Generate error</a></Link>
        <Link route='signin'><a>Signin</a></Link>
        <Link route='register'><a>Register</a></Link>
      </div>
    );
  }
}

export default hoc('index')(Index);
