/*
 * AdamHome
 * This is the first thing users see of our App
 */

import Eyes from './Eyes.react';
import Recognizer from './Recognizer';
import Speech from 'react-speech'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

var AdamHome = React.createClass({

  mixins: [Recognizer],

  getInitialState: function() {
    return {
      echoWords: 'Hello There',
    };
  },

  sendTranscript: function(transcript) {
    var echoWords = transcript;
    this.setState({echoWords});
  },

  renderVersionText: function() {
    return <h1>Hello World7!</h1>;
  },

  componentDidUpdate: function() {
    this.player.play();
  },

  render:function() {
    if (!this.state) {
      this.state = {...this.getInitialState()};
    }

    return (
      <div style={StyleSheet.textStyle}>
        <Eyes/>
        <Speech
          ref={ref => this.player = ref}
          text={this.state.echoWords}
          autoStart={true}
        />
      </div>
    );
  },
});

var StyleSheet = {
  textStyle: {
    padding: 200,
    color: 'white',
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
