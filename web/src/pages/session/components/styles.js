import styled from 'react-emotion';

export const SessionStatsTable = styled('table')`
  thead {
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.69;
    letter-spacing: normal;
    text-align: left;
    color: var(--bluish-grey);
  }

  tbody {
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.97;
    letter-spacing: normal;
    color: var(--dark-blue-grey);
  }
`;

export const Section = styled('div')`
  text-align: center;
  width: 138px;
  height: 27px;
`;

export const SelectedBar = styled('div')`
  width: 106px;
  height: 4px;
  background-color: var(--apple-green);
  ${props => props.hidden && 'display: none;'}
`;
