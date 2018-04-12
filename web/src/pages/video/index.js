/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react';
import moment from 'moment';
import videoJSStyles from 'video.js/dist/video-js.css';
import videojs from 'video.js';

import { Main } from '~/components';
import { Page } from '~/components/base';
import { Puce } from '~/styles';
import hoc from '~/hoc';

import { MainContainer, Title, VideoContainer } from './styles';
import { KeyMoments } from './components';

class Video extends Page {
  constructor(props) {
    super(props);

    const { video } = props;

    this.state = {
      marks: video.session.exchanges.map(exchange =>
        moment.duration(exchange.start_at.time).asSeconds()),
    };
  }

  componentDidMount() {
    const { video } = this.props;
    const { url } = video.asset;

    const options = {
      fluid: true,
      autoplay: true,
      controls: true,
      sources: [{
        src: url,
        type: video.content_type,
      }],
    };

    this.player = videojs(this.videoNode, options);
  }

  render() {
    const { t, video } = this.props;
    const moments = video.session.exchanges.map(exchange => ({
      id: exchange.id,
      time: moment.duration(exchange.start_at.time).asSeconds(),
    }));
    return (
      <Main title={t('video:title')} width={970}>
        <style>{videoJSStyles}</style>
        <Title>
          <Puce />
          {video.session.label}
        </Title>
        <MainContainer>
          <VideoContainer>
            <div data-vjs-player>
              <video ref={(node) => { this.videoNode = node; }} className='video-js' />
            </div>
          </VideoContainer>
          <KeyMoments
            moments={moments}
            onGoTo={time => this.player.currentTime(time)}
          />
        </MainContainer>
      </Main>
    );
  }
}

export default hoc('video', {
  endpoint: query =>
    `/tennis/videos/${query.id}?include=session,session.exchanges,session.exchanges.start_at,asset`,
})(Video);
