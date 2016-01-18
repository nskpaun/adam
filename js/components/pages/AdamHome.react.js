/*
 * AdamHome
 * This is the first thing users see of our App
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class AdamHome extends Component {

  // _readCommand(command) {
  //   this._commmand = command;
  // }

  handleSubmit() {
    console.log("NATE " + this.state.command);
  }

  render() {
    return (
      <div>
        <h1>Hi I'm Adam</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Talk to Me:
            <input
              type="text"
              value={this.state.command}
            />
          </label>
          <Link className="btn" to="/readme">Setup</Link>
        </form>
      </div>
    );
  }
}

var StyleSheet = {

}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(AdamHome);
