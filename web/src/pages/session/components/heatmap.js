import { defaultPropTypes, OptionButton } from '~/components';
import { shape } from 'prop-types';
import { css } from 'react-emotion';
import React from 'react';
import { PureComponent } from '~/components/base';
import _ from 'lodash';
import {
  HeatMapContainer as Container,
  HeatMapOptionContainer as ButtonContainer,
} from './styles';


class HeatMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // be more explicit on variable name
      firstPlayerSelected: true,
      typeOfHit: ['service', 'forehand', 'backhand',
      // Note : list must be coherent with the one used in python
        'volley', 'overhead'],
      // TODO : change color based on surface
      color: 'rgb(0, 102, 255)',
    };
  }

  handleClick = (type) => {
    if (type === 'player') {
      // if click on player change player selected
      this.setState({ firstPlayerSelected: !this.state.firstPlayerSelected });
    } else {
      // if click on option: update list of hit to display
      const typeOfHits = _.clone(this.state.typeOfHit);
      const index = typeOfHits.indexOf(type);
      if (index > -1) {
        typeOfHits.splice(index, 1);
      } else {
        typeOfHits.push(type);
      }
      this.setState({ typeOfHit: typeOfHits });
    }
  };

  renderOptions(type) {
    /* render ooption button : switch button to select type of hit to display
    and wich player to display */
    /* TODO : should take t as argument for translation */
    const { t } = this.context;
    const { session } = this.props;
    let player = '';
    if (this.state.firstPlayerSelected) {
      // If right player select player[0] to be coherent width
      // player order on the screen
      // @michael : player id is in lower case when I create the stat in python
      // but doesn't exist in lower case ... bizarre bizarre
      player = session.players[0].data['player-id'].toLowerCase();
    } else {
      player = session.players[1].data['player-id'].toLowerCase();
    }
    if (type === 'player') {
      return (
        // render player button option
        <OptionButton
          text={player}
          className={css`width: 100%`}
          value={type}
          onClick={() => this.handleClick(type)}
        />

      );
    }
    // render option for selected type of hits
    const index = this.state.typeOfHit.indexOf(type);
    return (
      <OptionButton
        isClicked={index > -1}
        text={t(type)}
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
    if (this.state.firstPlayerSelected) {
      // select player for which to render balls
      player = session.players[0].data['player-id'].toLowerCase();
    } else {
      player = session.players[1].data['player-id'].toLowerCase();
    }
    let ListOfBalls = [];

    // update list of ball for each selected type of hits
    const arrayLength = this.state.typeOfHit.length;
    for (let i = 0; i < arrayLength; i += 1) {
      ListOfBalls = ListOfBalls.concat(session.current_stats
        .data.reboundposition[player][this.state.typeOfHit[i]]);
    }

    // display balls (white circle / black center)
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
    if (this.state.firstPlayerSelected) {
      // select which player to render positions
      player = session.players[0].data['player-id'].toLowerCase();
    } else {
      player = session.players[1].data['player-id'].toLowerCase();
    }

    let ListOfPlayers = [];

    // update list of player position per type of hits
    const arrayLength = this.state.typeOfHit.length;
    for (let i = 0; i < arrayLength; i += 1) {
      ListOfPlayers = ListOfPlayers.concat(session.current_stats
        .data.hitterposition[player][this.state.typeOfHit[i]]);
    }

    // display player position as rectangle
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
    // render court
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

    // TODO : update color based on surface  type
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
    const viewBox = `${viewBoxTop}
    ${viewBoxLeft} ${viewBoxWidth} ${viewBoxHeight}`;

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
          {this.renderOptions('overhead') }
        </ButtonContainer>
      </Container>

    );
  }
}


HeatMap.propTypes = {
  session: shape().isRequired,
};

HeatMap.defaultProps = {
};

HeatMap.contextTypes = defaultPropTypes;

export default HeatMap;
