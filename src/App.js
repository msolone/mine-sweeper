import React, { Component } from 'react';
import './App.css';
import MineSweeper from './MineSweeper'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Mine Sweeper!</h1>
        <MineSweeper />
        <h1 className='youLose'>You Lose!</h1>
        <h1 className='youWin'>You Win!</h1>
      </div>
    );
  }
}

export default App;
