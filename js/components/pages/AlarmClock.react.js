/*
 * AlarmClock
 * This is the first thing users see of our App
 */

import React, { Component } from 'react';
import { PlayButton, Progress, Icons } from 'react-soundplayer/components';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
var TimerMixin = require('react-timer-mixin');
import Secrets from './Secrets';

const { SoundCloudLogoSVG } = Icons;

const clientId = Secrets.soundCloudClientId;

var AlarmClock = React.createClass({

  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      soundAlarm: false,
    }
  },

  handleRing: function() {
    if (!this.didRing) {
      this.didRing = true;
      this.setState({soundAlarm: true})
    }
  },

  handleFinishLoading: function() {
    this._playerRef && this._playerRef.forcePlay();
  },

  render: function() {
    this.didRing = false;
    this.setTimeout(
      this.handleRing,
      this.props.alarmOffset,
    );
    if (!this.state) {
      this.state = {};
    }
    var url = this.state.soundAlarm ? this.props.streamUrl : this.props.noiseUrl;

    return (
      <div style={StyleSheet.alarmText}>
        {'Alarm set in ' + this.props.alarmOffset + 'millis'}
        <SoundPlayerContainer resolveUrl={url} clientId={clientId}>
          <CustomPlayer
            ref={ref => this._playerRef = ref}
            onFinishLoading={this.handleFinishLoading}/>
        </SoundPlayerContainer>
      </div>
    );
  },
});

var CustomPlayer = React.createClass({
    play: function() {
        let { soundCloudAudio, playing } = this.props;
        if (playing) {
            soundCloudAudio.pause();
        } else {
            soundCloudAudio.play();
        }
    },

    forcePlay: function() {
      let { soundCloudAudio, playing } = this.props;
      soundCloudAudio.play();
    },

    render: function() {
        let { track, playing } = this.props;

        if (!track) {
            return <div>Loading...</div>;
        }

        this.props.onFinishLoading();

        return (
            <div>
            </div>
        );
    },
});

var StyleSheet = {
  alarmText: {
    color: 'red',
  },
};

export default AlarmClock;
