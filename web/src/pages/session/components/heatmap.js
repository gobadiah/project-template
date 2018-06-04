import { defaultPropTypes, OptionButton } from '~/components';
import { arrayOf, shape, string } from 'prop-types';
import { css } from 'react-emotion';
import React from 'react';
import { PureComponent } from '~/components/base';
import _ from 'lodash';

/* import SwitchButton from 'react-switch-button';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-switch-button/dist/react-switch-button.css'; */

// import Switch from 'react-toggle-switch'


// @ michael how to isntall switch button ?
import {
  HeatMapContainer as Container,
  HeatMapOptionContainer as ButtonContainer,
} from './styles';

class HeatMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // be more explicit on variable name
      right_player: true,
      // Note : list must be coherent with the one used in python
      type_of_hit: ['service', 'forehand', 'backhand',
        'volley', 'overhead'],
      color: 'rgb(0, 102, 255)',
    };
    // This binding is necessary to make `this` work in the callback
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (type) => {
    /* const typeOfHits = ['service', 'forehand', 'backhand',
      'volley', 'overhead']; */
    if (type === 'player') {
      this.setState({ right_player: !this.state.right_player });
    } else {
      const typeOfHits = _.clone(this.state.type_of_hit);
      const index = typeOfHits.indexOf(type);
      if (index > -1) {
        typeOfHits.splice(index, 1);
      } else {
        typeOfHits.push(type);
      }


      this.setState({ type_of_hit: typeOfHits });

    }

  }

  renderOptions(type) {
    /* TODO : should take t as argument for translation */
    const { t } = this.context;
    if (type === 'player') {
      return (
        <OptionButton
          text={t((this.state.right_player ? 'Right' : 'Left'))}
          className={css`width: 100%`}
          value={type}
          onClick={() => this.handleClick(type)}
        />

      );
    }
    const index = this.state.type_of_hit.indexOf(type);
    return (
      <OptionButton
        fill={index > -1 ? 'green' : 'gray'}
        text={t((index > -1 ? type : 'OFF'))}
        className={css`width: 100%`}
        value={type}
        onClick={() => this.handleClick(type)}
      />

    );
  }


  renderBalls() {
    const { session } = this.props;
    const originX = 200;
    const originY = 200;

    let player = '';
    if (this.state.right_player) {
      // If right player select player[1] to be coherent width
      // player order on the screen
      // @michael : player id is in lower case when I create the stat in python
      // but doesn't exist in lower case ... bizarre bizarre
      player = session.players[1].data['player-id'].toLowerCase();
    } else {
      player = session.players[0].data['player-id'].toLowerCase();
    }
    console.log('PLAYER', player);
    console.log(session.current_stats.data['reboundposition']);
    let ListOfBalls = [];

    /* selection per type of hit */
    const arrayLength = this.state.type_of_hit.length;
    for (let i = 0; i < arrayLength; i += 1) {
      ListOfBalls = ListOfBalls.concat(session.current_stats
        .data.reboundposition[player][this.state.type_of_hit[i]]);
    }

    const res = [ListOfBalls.map(el => React.createElement(
      'circle',
      {
        cx: (el[0] * 100) + originX,
        cy: (el[1] * 100) + originY,
        fill: 'black',
        fillOpacity: 1,
        r: 5,
      },
    )),
    ListOfBalls.map(el => React.createElement(
      'circle',
      {
        cx: (el[0] * 100) + originX,
        cy: (el[1] * 100) + originY,
        fill: 'white',
        fillOpacity: 0.4,
        r: 20,
      },
    ))];
    return res;
  }


  renderPlayers() {
    const { session } = this.props;
    const originX = 200;
    const originY = 200;
    const RectSize = 30;
    let player = '';
    if (this.state.right_player) {
      player = session.players[1].data['player-id'].toLowerCase();
    } else {
      player = session.players[0].data['player-id'].toLowerCase();
    }
    /* console.log(player);
    console.log(this.state.type_of_hit); */
    let ListOfPlayers = [];

    /* selection per type of hit */
    const arrayLength = this.state.type_of_hit.length;
    for (let i = 0; i < arrayLength; i += 1) {
      ListOfPlayers = ListOfPlayers.concat(session.current_stats
        .data.hitterposition[player][this.state.type_of_hit[i]]);
    }

    console.log(ListOfPlayers);
    const res = [ListOfPlayers.map(el => React.createElement(
      'rect',
      {
        x: ((el[0] * 100) + originX) - (RectSize / 2),
        y: ((el[1] * 100) + originY) - (RectSize / 2),
        width: RectSize,
        height: RectSize,
        fill: 'var(--apple-green)',
        fillOpacity: 0.4,
        stroke: 'green',
        strokeWidth: 4,
      },
    ))];
    return res;
  }


  renderCourt(ThisType) {
    /* TODO : Explain metrics */
    const dimensions = [
      [[0, 0], [2377, 0]],
      [[0, 1097], [2377, 1097]],
      [[0, 0], [0, 1097]],
      [[2377, 0], [2377, 1097]],
      [[2377 / 2, -91.4], [2377 / 2, 1097 + 91.4]],
      [[0, 137.2], [2377, 137.2]],
      [[0, 1097 - 137.2], [2377, 1097 - 137.2]],
      [[550, 137.2], [550, 1097 - 137.2]],
      [[2377 - 550, 137.2], [2377 - 550, 1097 - 137.2]],
      [[550, 1097 / 2], [2377 - 550, 1097 / 2]],
      [[0, 1097 / 2], [30, 1097 / 2]],
      [[2377 - 30, 1097 / 2], [2377, 1097 / 2]],
    ];

    const originX = 200;
    const originY = 200;

    const rect = [[0, 0], [2377, 1097]];

    const thisColor = this.state.color;
    // console.log(hits.data);
    if (ThisType === 'lines') {
      return dimensions.map(el => React.createElement(
        'line',
        {
          x1: el[0][0] + originX,
          y1: el[0][1] + originY,
          x2: el[1][0] + originX,
          y2: el[1][1] + originY,
          stroke: 'white',
          strokeWidth: '5',
        },
      ));
    } else if (ThisType === 'back') {
      const res = React.createElement(
        'rect',
        {
          x: rect[0][0] + originX,
          y: rect[0][1] + originY,
          width: rect[1][0],
          height: rect[1][1],
          fill: thisColor,
          strokeWidth: '5',
        },
      );

      return res;
    }
    return <div />;
  }


  render() {
    const viewBoxWidth = 2800; // Because it's the size of my screen
    const viewBoxHeight = 1500; // Because that's my preferred number
    const viewBoxTop = 0;
    const viewBoxLeft = 0;
    const viewBox = `${viewBoxTop} ${viewBoxLeft} ${viewBoxWidth} ${viewBoxHeight}`;

    return (
      <Container>
        <Container>
          <svg viewBox={viewBox} >
            {this.renderCourt('back')}
            {this.renderCourt('lines')}
            {this.renderBalls()}
            {this.renderPlayers()}
          </svg>
        </Container>
        <ButtonContainer>
          {this.renderOptions('player') }
          {this.renderOptions('service') }
          {this.renderOptions('forehand') }
          {this.renderOptions('backhand') }
          {this.renderOptions('volley') }
        </ButtonContainer>
      </Container>

    );
  }
}


HeatMap.propTypes = {
  session: shape().isRequired,
  stats: arrayOf(string).isRequired,
};

HeatMap.defaultProps = {
};

HeatMap.contextTypes = defaultPropTypes;

export default HeatMap;
