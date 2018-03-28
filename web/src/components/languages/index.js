import React from 'react';
import { element } from 'prop-types';

import { availableLanguages } from '~/services/i18n';
import { currentLanguage } from '~/utils';
import { defaultPropTypes } from '~/components';

import Lang from './lang';

import {
  Menu,
  SubMenu,
  button,
  size,
} from './styles';

class Languages extends React.Component {
  constructor(props) {
    super(props);
    this.divs = {};
  }

  setLanguage = (lng) => {
    const { i18n } = this.context;
    window.document.cookie = `i18next=${lng}`;
    i18n.changeLanguage(lng);
  };

  render() {
    const { Language } = this.props;
    const { i18n } = this.context;
    const current = currentLanguage(i18n);
    return (
      <Menu>
        { React.cloneElement(Language, { lng: current, className: size }) }
        <SubMenu>
          {
            availableLanguages.filter(lng => lng !== current).map(lng => (
              <button
                className={button}
                key={lng}
                onClick={() => this.setLanguage(lng)}
              >
                { React.cloneElement(Language, { lng, className: size }) }
              </button>
            ))
          }
        </SubMenu>
      </Menu>
    );
  }
}

Languages.propTypes = {
  Language: element,
};

Languages.defaultProps = {
  Language: <Lang lng='fr' />,
};

Languages.contextTypes = defaultPropTypes;

export default Languages;
