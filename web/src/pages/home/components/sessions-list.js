import { arrayOf, shape } from 'prop-types';
import React from 'react';

import { Link } from '~/routes';
import { FlexEnd, Puce, Small, WhiteBox } from '~/styles';
import { defaultPropTypes } from '~/components';

import {
  SessionsListTable as Table,
  SessionsListTHead as THead,
  SessionsListTBody as TBody,
} from './styles';

const SessionsList = ({ sessions }, { t }) => (
  <WhiteBox>
    { sessions.map(session => (
      <Link route='session' params={{ id: session.id }} key={session.id}>
        <div css='cursor: pointer;'>
          <FlexEnd>
            <Puce />
            <Small>{t('home:Session title', session)}</Small>
          </FlexEnd>
          <Table>
            <THead>
              <tr>
                <td>
                  {t('Opponent')}
                </td>
                <td>
                  {t('Surface')}
                </td>
              </tr>
            </THead>
            <TBody>
              <tr>
                <td>
                  {session.opponent}
                </td>
                <td>
                  {session.surface}
                </td>
              </tr>
            </TBody>
          </Table>
        </div>
      </Link>
    )) }
  </WhiteBox>
);

SessionsList.propTypes = {
  sessions: arrayOf(shape()),
};

SessionsList.defaultProps = {
  sessions: [],
};

SessionsList.contextTypes = defaultPropTypes;

export default SessionsList;
