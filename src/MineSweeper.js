import React, { Component } from "react";
// import Squares from './Squares'

const BASE_URL = "https://minesweeper-api.herokuapp.com/";

class MineSweeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        board: []
      }
      
    }
  }

  componentDidMount() {
    fetch(`${BASE_URL}games`, {
      method: "POST",
      body: JSON.stringify({ difficult: 0 })
    })
      .then(resp => resp.json())
      .then(newGame => {
        console.log("game", newGame);
        this.setState({
          game: newGame,
        });
      });
  }

  render() {
    return (
    // <div>
    //     Current Game: {this.state.game.id}
      <div className='game-board'>
        
        {this.state.game.board.map((row, i) => {
          return (
            <div className='rows'>
              {row.map((col, j) => {
                return <span className='squares'></span>;
              })}
            </div>
          );
        })}
      </div>
    // </div>  
    );
  }
}

export default MineSweeper;
