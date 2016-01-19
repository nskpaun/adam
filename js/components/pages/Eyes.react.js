/*
 * Eyes
 * This is the first thing users see of our App
 */

import React, { Component } from 'react';
var TimerMixin = require('react-timer-mixin');

var Eyes = React.createClass({

  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      eyeBlinked: false,
      mounted: false,
    };
  },

  componentDidMount: function() {
    this.setInterval(
      this.handleBlink,
      1000
    );
  },

  handleBlink: function() {
    this.setState({eyeBlinked: !this.state.eyeBlinked});
  },

  renderEye: function(top) {
    var left = top ? 250 : 100;
    var style = {
      ...StyleSheet.box,
      marginLeft: left,
    }
    return (
      <div style={style}/>
    )
  },

  render: function() {
    return (
      <div>
        {this.renderEye(this.state.eyeBlinked)}
        {this.renderEye(!this.state.eyeBlinked)}
      </div>
    );
  },
});

var StyleSheet = {
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'gray',
  },
};

// Wrap the component to inject dispatch and state into it
export default Eyes;
