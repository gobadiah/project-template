import React from 'react';

import { Puce, WhiteBox } from '~/styles';
import { defaultPropTypes } from '~/components';
import puce from '~/images/puce.png';

import rankingHistory from './fixtures/history';
import { Normal } from './styles';

const numberOfLines = 5;
const width = 503;
const height = 229;
const space = height / (numberOfLines - 1);
const puceSide = 16;

const ints = [];
for (let i = 0; i < numberOfLines; i += 1) {
  ints.push(i);
}

const RankingHistory = (props, { t }) => {
  const months = [
    t('JAN'),
    t('FEV'),
    t('MAR'),
    t('APR'),
    t('MAY'),
    t('JUN'),
    t('JUL'),
    t('AUG'),
    t('SEP'),
    t('OCT'),
    t('NOV'),
    t('DEC'),
  ];
  const month = (new Date()).getMonth();
  const startMonth = (month + 1) % 12;
  const minRanking = Math.min(...rankingHistory) * 0.9;
  const maxRanking = Math.max(...rankingHistory) * 1.1;
  const a = height / (minRanking - maxRanking);
  const b = -a * maxRanking;
  const coordinates = (i, ranking) => ({
    x: ((i * width) / 12) + (width / 24),
    y: (a * ranking) + b,
  });
  return (
    <WhiteBox css='margin-bottom: 16px'>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Puce />
        <Normal css='margin-left: 5px'>{t('Kincube ranking history')}</Normal>
      </div>
      <svg width={width} height={height} style={{ marginTop: '42px' }}>
        {
          ints.map((i) => {
            let y = i * space;
            if (i === 0) {
              y += 1;
            } else if (i === numberOfLines - 1) {
              y -= 1;
            }
            return (
              <line
                key={i}
                x1={0}
                y1={y}
                x2={width}
                y2={y}
                strokeWidth={1}
                stroke='#b6b6b6'
              />
            );
          })
        }
        {
          rankingHistory.map((ranking, i) => {
            const { x, y } = coordinates(i, ranking);
            return (
              <image
                xlinkHref={puce}
                x={x - (puceSide / 2)}
                y={y - (puceSide / 2)}
                key={months[i]}
              />
            );
          })
        }
        {
          rankingHistory.map((ranking, i) => {
            if (i === 0) {
              return undefined;
            }
            const c1 = coordinates(i, ranking);
            const c0 = coordinates(i - 1, rankingHistory[i - 1]);
            const hypotenuse = Math.sqrt(((c1.x - c0.x) ** 2) + ((c1.y - c0.y) ** 2));
            const sin = (c1.y - c0.y) / hypotenuse;
            const cos = (c1.x - c0.x) / hypotenuse;
            return (
              <line
                key={months[i]}
                x1={c0.x + (cos * (puceSide / 2))}
                y1={c0.y + (sin * (puceSide / 2))}
                x2={c1.x - (cos * (puceSide / 2))}
                y2={c1.y - (sin * (puceSide / 2))}
                strokeWidth={2}
                stroke='#7ed321'
              />
            );
          })
        }
      </svg>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: '#828e9e',
          marginTop: '10px',
        }}
      >
        {
          [...Array(12)].map((x, i) => (
            <span key={months[(i + startMonth) % 12]}>{months[(i + startMonth) % 12]}</span>
          ))
        }
      </div>
    </WhiteBox>
  );
};

RankingHistory.contextTypes = defaultPropTypes;

export default RankingHistory;
