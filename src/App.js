import React, { Component } from 'react';
import './App.css';
import MineSweeper from './MineSweeper'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Mine Sweeper!</h1>
        <MineSweeper />
      </div>
    );
  }
}

export default App;
