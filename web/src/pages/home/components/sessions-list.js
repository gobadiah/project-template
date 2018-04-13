import { arrayOf, shape } from 'prop-types';
import React from 'react';

import { Link } from '~/routes';
import { Puce, WhiteBox } from '~/styles';
import { defaultPropTypes } from '~/components';

import {
  SessionTitle,
  SessionsListTable as Table,
  SessionsListTHead as THead,
  SessionsListTBody as TBody,
  Small,
} from './styles';

const SessionsList = ({ sessions }, { t }) => (
  <WhiteBox>
    { sessions.map(session => (
      <Link route='session' params={{ id: session.id }} key={session.id}>
        <div css='cursor: pointer;'>
          <SessionTitle>
            <Puce />
            <Small>{t('home:Session title', session)}</Small>
          </SessionTitle>
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
                  {t(session.data.surface)}
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
