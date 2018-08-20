import React, { Component } from 'react';
import './App.css';
import MineSweeper from './MineSweeper'
// import Difficulty from './Difficulty'

class App extends Component {
  render() {
    return (
      
      <div className="App">
        <h1>MINESWEEPER!</h1>
        {/* <Difficulty /> */}
        <MineSweeper />
        <h2 className='youLose'>You Lose!</h2>
        <h2 className='youWin'>You Win!</h2>
      </div>
    
    );
  }
}

export default App;
