import { arrayOf, func, number, string } from 'prop-types';
import React from 'react';

import { ClearButton, FlexColumnCenter } from '~/styles';
import { defaultPropTypes } from '~/components';

import { Section, SectionsBar, SelectedBar } from './styles';

const Sections = ({ sectionIndex, sections, onSectionChange }) => (
  <SectionsBar>
    { sections.map((section, index) => (
      <ClearButton key={section} onClick={() => onSectionChange(index)}>
        <FlexColumnCenter>
          <Section>{section}</Section>
          <SelectedBar hidden={index !== sectionIndex} />
        </FlexColumnCenter>
      </ClearButton>
    )) }
  </SectionsBar>
);

Sections.propTypes = {
  sectionIndex: number.isRequired,
  sections: arrayOf(string).isRequired,
  onSectionChange: func.isRequired,
};

Sections.contextTypes = defaultPropTypes;

export default Sections;
