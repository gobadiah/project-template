/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react';
import moment from 'moment';
import videoJSStyles from 'video.js/dist/video-js.css';
import videojs from 'video.js';

import { Main } from '~/components';
import { Page } from '~/components/base';
import hoc from '~/hoc';

import { MainContainer } from './styles';

class Video extends Page {
  constructor(props) {
    super(props);

    const { video } = props;

    console.log('video', video);

    this.state = {
      marks: video.session.exchanges.map(exchange =>
        moment.duration(exchange.start_at.time).asSeconds()),
    };
  }

  componentDidMount() {
    const { video } = this.props;
    const { url } = video.asset;

    console.log('url', url);
    console.log('type', video.content_type);

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
    const { t } = this.props;
    return (
      <Main title={t('video:title')}>
        <MainContainer>
          <div>
            <style>{videoJSStyles}</style>
            <div data-vjs-player>
              <video ref={(node) => { this.videoNode = node; }} className='video-js' />
            </div>
          </div>
        </MainContainer>
      </Main>
    );
  }
}

export default hoc('video', {
  endpoint: query =>
    `/tennis/videos/${query.id}?include=session,session.exchanges,session.exchanges.start_at,asset`,
})(Video);
