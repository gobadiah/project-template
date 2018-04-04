/* eslint-disable react/no-array-index-key */

import React from 'react';
import { arrayOf, shape } from 'prop-types';

import { defaultPropTypes } from '~/components';

import {
  Building,
  Container,
  Td,
  winner,
  loser,
} from './styles';

const Score = ({ score }) => (
  <Container>
    <table>
      <tbody>
        {
          [0, 1].map((row, rowIndex) => (
            <tr key={rowIndex}>
              {
                score.map((set, setIndex) => (
                  <Td
                    key={setIndex}
                    className={set[row].is_winner ? winner : loser}
                  >
                    {set[row].games_won}
                  </Td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
    <Building>
      EN CONSTRUCTION
    </Building>
  </Container>
);

Score.propTypes = {
  score: arrayOf(arrayOf(shape())).isRequired,
};

Score.defaultProps = {
};

Score.contextTypes = defaultPropTypes;

export default Score;
