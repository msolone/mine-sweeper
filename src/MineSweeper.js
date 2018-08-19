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

  boxClicked = (i, j) => {
      console.log("box clicked ", i, j)
      fetch(`${BASE_URL}games/${this.state.game.id}/check`, {
          method:"POST", 
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body:JSON.stringify({row: i, col: j})
      }).then (resp => resp.json())
      .then(latestGameData => {
          console.log(latestGameData)
          this.setState({
              game: latestGameData
          })  
      })

  }

  render() {
    return (
    <div>
        Current Game: {this.state.game.id}
      <div className='game-board'>
        
        {this.state.game.board.map((row, i) => {
          return (
            <div className='rows' key={i}>
              {row.map((col, j) => {
                return <span className='squares' onClick={() => this.boxClicked(i,j)} key={j}>{this.state.game.board[i][j]}</span>;
              })}
            </div>
          );
        })}
      </div>
    </div>  
    );
  }
}

export default MineSweeper;
