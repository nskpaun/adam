/*
 * AdamHome
 * This is the first thing users see of our App
 */

import AlarmClock from './AlarmClock.react';
import Eyes from './Eyes.react';
import Interpreter from './Interpreter';
import Recognizer from './Recognizer';
import Speech from 'react-speech'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const ALARM_URL = 'https://soundcloud.com/linkin_park/burn-it-down';
const WHITE_NOISE_URL = 'https://soundcloud.com/tauqeer-ahmad-waheedi/relaxing-rain-and-thunder';
const MILLIS_PER_HOUR = 1000*60*60;

var AdamHome = React.createClass({

  mixins: [Recognizer],

  getInitialState: function() {
    return {
      echoWords: 'Hello There',
      value: 'Hello!',
    };
  },

  sendTranscript: function(transcript) {
    var result = Interpreter.interpret(transcript, this.state);
    this.setState({...result});
  },

  renderVersionText: function() {
    return <h1>Hello World7!</h1>;
  },

  componentDidUpdate: function(props, state) {
    if (this.state.echoWords !== state.echoWords) {
      this.player.play();
    }
  },

  renderTextInput: function() {
    var value = this.state.value;
    return (
      <div>
        <input onChange={this.handleChange} value={value} />
        <button
          onClick={this.sendTranscript.bind(this,value)}>
          {'Submit'}
        </button>
      </div>
    );
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },

  renderAlarm: function() {
    if (this.state.command === 'setAlarm') {
      var alarmOffset = MILLIS_PER_HOUR * this.state.data;
      return <AlarmClock
        noiseUrl={WHITE_NOISE_URL}
        streamUrl={ALARM_URL}
        alarmOffset={alarmOffset}
        onSnooze={this.handleSnooze}/>
    }
    return null;
  },

  onRecognitionEnd: function() {
    this._recognitionEnded = true;
  },

  handleSnooze: function() {
    this.setState({echoWords: Interpreter.QUESTIONS.SNOOZE, command: undefined});
  },

  render:function() {
    if (!this.state) {
      this.state = {...this.getInitialState()};
    }

    if (this._recognitionEnded === true) {
      this._recognitionEnded = false;
      this.recognition.start();
    }

    return (
      <div style={StyleSheet.textStyle}>
        <Eyes/>
        <Speech
          ref={ref => this.player = ref}
          text={this.state.echoWords}
          autoStart={true}
        />
        {this.renderAlarm()}
      </div>
    );
  },
});

var StyleSheet = {
  textStyle: {
    padding: 200,
    color: 'black',
  },
};

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(AdamHome);
