import { arrayOf, bool, shape, string } from 'prop-types';
import {defaultPropTypes } from '~/components';
import { css } from 'react-emotion';
import React from 'react';

/*
const HeatMap = ({ session, stats }, { t }) => (
  <div>Test</div>
);*/

import { PureComponent } from '~/components/base';
// @ michael how to isntall switch button ?
import { RoundButton } from '~/components';
import { HeatMapContainer as Container ,
          HeatMapOptionContainer as ButtonContainer} from './styles';

class HeatMap extends PureComponent {


  constructor(props) {
        super(props);
        this.state = {
          right_player: true,
          type_of_hit: []
        };
  }

  handleClick(type){
      list_type_of_hits = ["service" , "forehand" , "backhand" , "volley" , "overhead"]
      if (type === "player") {
        this.setState({right_player: !this.state.right_player})
      }
      if (list_type_of_hits.indexOf(type) >= 0) {
        const this_type_of_hits = this.state.type_of_hit;
        const index = this_type_of_hits.indexOf(type);
        if (index > -1) {
          this_type_of_hits.splice(index, 1);
        }
        else {
          this_type_of_hits.push(type);
        }

        // console.log(this_type_of_hits);
        this.setState({type_of_hit:this_type_of_hits})
      }


  }

  renderOptions(type){
     /* TODO : should take t as argument for translation*/
     const { t } = this.context;
     return (
       <RoundButton
         text={t(type)}
         className={css`width: 100%`} value={type}
         onClick={() => this.handleClick(type)}
         />

     );


  }

  renderCourt(this_type) {

    /* TODO : Explain metrics*/
    const dimensions =[[[0, 0], [2377, 0]],
            [[0, 1097], [2377, 1097]],
            [[0, 0], [0, 1097]],
            [[2377, 0], [2377, 1097]],
            [[2377 / 2, - 91.4], [2377 / 2, 1097 + 91.4]],
            [[0, 137.2], [2377, 137.2]],
            [[0, 1097 - 137.2], [2377, 1097 - 137.2]],
            [[550, 137.2], [550, 1097 - 137.2]],
            [[2377-550, 137.2], [2377-550, 1097 - 137.2]],
            [[550, 1097 / 2], [2377 - 550, 1097 / 2]],
            [[0, 1097 / 2], [30, 1097 / 2]],
            [[2377-30, 1097 / 2], [2377, 1097 / 2]]
          ];

      const origin_x = 200;
      const origin_y = 200;

      const rect = [[0,0], [2377,1097]]

      //console.log(hits.data);
      if (this_type === "lines"){
        return dimensions.map(el => React.createElement("line",
                                                        {x1:el[0][0] + origin_x,
                                                        y1:el[0][1] + origin_y,
                                                        x2:el[1][0] + origin_x,
                                                        y2:el[1][1] + origin_y,
                                                        stroke:"white",
                                                        strokeWidth:"5"
                                                      }))
      }
      if (this_type === "back"){
        const res = React.createElement("rect" ,{x: rect[0][0] + origin_x ,
                                           y:rect[0][1] + origin_y,
                                           width:rect[1][0],
                                           height:rect[1][1],
                                           fill:"rgb(0, 102, 255)",
                                           strokeWidth:"5"});

        return res;
      }
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
        <svg viewBox ={viewBox}>
          {this.renderCourt("back")}
          {this.renderCourt("lines")}
        </svg>
        </Container>
        <ButtonContainer>
            {this.renderOptions("player") }
            {this.renderOptions("service") }
            {this.renderOptions("forehand") }
            {this.renderOptions("backhand") }
            {this.renderOptions("volley") }
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
