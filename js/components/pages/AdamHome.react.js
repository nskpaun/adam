/*
 * AdamHome
 * This is the first thing users see of our App
 */

import Eyes from './Eyes.react';
import Speech from 'react-speech'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

var AdamHome = React.createClass({

  render:function() {
    return (
      <div style={StyleSheet.textStyle}>
        <Eyes/>
        <Speech text="I have the default settings" />
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
