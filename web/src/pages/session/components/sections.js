import React from 'react';

import { ClearButton, FlexCenter, FlexColumnCenter } from '~/styles';
import { PureComponent } from '~/components/base';
import { defaultPropTypes } from '~/components';

import { Section, SelectedBar } from './styles';

class Sections extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentSection: 0,
    };
  }

  render() {
    const { currentSection } = this.state;
    const { t } = this.context;
    const sections = [t('session:KEY NUMBERS'), t('session:STATISTICS'), t('PERFORMANCES')];
    return (
      <FlexCenter>
        { sections.map((section, index) => (
          <ClearButton key={section} onClick={() => this.setState({ currentSection: index })}>
            <FlexColumnCenter>
              <Section>{section}</Section>
              <SelectedBar hidden={index !== currentSection} />
            </FlexColumnCenter>
          </ClearButton>
        )) }
      </FlexCenter>
    );
  }
}

Sections.contextTypes = defaultPropTypes;

export default Sections;
