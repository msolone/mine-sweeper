import React, { Component } from "react";


const BASE_URL = "https://minesweeper-api.herokuapp.com/";

class MineSweeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        board: []
      },
      message: "",
      difficulty: 0
    };
  }

  createGame () {
    fetch(`${BASE_URL}games`, {
      method: "POST",
      body: JSON.stringify({ difficulty: this.state.difficulty }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(newGame => {
        console.log("game", newGame);
        this.setState({
          game: newGame
        });
      });
  }

  boxClicked = (i, j) => {
    if (this.state.game.state !== 'lost' && this.state.game.state !== 'won') { 
    console.log("box clicked ", i, j);
    fetch(`${BASE_URL}games/${this.state.game.id}/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ row: i, col: j })
    })
      .then(resp => resp.json())
      .then(latestGameData => {
        if (latestGameData.state === "lost") {
          console.log(latestGameData);
          this.setState({
            game: latestGameData,
            message: "You Lose"
          });
        } else if (latestGameData.state === "won") {
          console.log(latestGameData);
          this.setState({
            game: latestGameData,
            message: "You Win"
          });
        } else {
          console.log(latestGameData);
          this.setState({
            game: latestGameData,
            message: "Keep Playing"
          });
        }
      });
    }
  };

  boxRightClicked = (event, i, j) => {
    event.preventDefault();
    console.log("box clicked ", i, j);
    fetch(`${BASE_URL}games/${this.state.game.id}/flag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ row: i, col: j })
    })
      .then(resp => resp.json())
      .then(latestGameData => {
        console.log(latestGameData);
        this.setState({
          game: latestGameData
        });
      });
  };

  easyMode = () => {
    this.setState(
      {
        difficulty: 0
      },
      this.createGame
    );
  };

  mediumMode = () => {
    this.setState(
      {
        difficulty: 1
      },
      this.createGame
    );
  };

  hardMode = () => {
    this.setState(
      {
        difficulty: 2
      },
      this.createGame
    );
  };

  renderSquares = (i, j) => {
      console.log(this.state.game.board[i][j])
      console.log(typeof this.state.game.board[i][j])
    if (this.state.game.board[i][j] === "F") {
      return <span role='img'>"🚩"</span>;
    } else if (this.state.game.board[i][j] === "*") {
      return <span role='img'>"💣"</span>;
    } else if (this.state.game.board[i][j] === "_") {
        return '_'  
    } else if (this.state.game.board[i][j] === 1) {
        return <span className='blue-num'>1</span>
    } else if (this.state.game.board[i][j] === 2) {
        return <span className='green-num'>2</span>} 
    else {
        return this.state.game.board[i][j]
    }
  };

  resetGame = () => {
      this.setState({
          message:'New Game'
      }, this.createGame())
    
  }

  render() {
    return (
      <div className="game-display">
        <h2>Choose your Difficulty!</h2>
        <div className="difficulty-level">
          <button onClick={this.easyMode}>Easy</button>
          <button onClick={this.mediumMode}>Medium</button>
          <button onClick={this.hardMode}>Hard</button>
        </div>
        <button className='reset-button'><span role='img' onClick={this.resetGame}>😀</span></button>
        <h1 className="playing-message">{this.state.message}</h1>
        <table className="game-board">
          <tbody>
            {this.state.game.board.map((row, i) => {
              return (
                <tr key={i} className="rows">
                  {row.map((col, j) => {
                    return (
                      <td
                        className="squares"
                        key={j}
                        onClick={() => this.boxClicked(i, j)}
                        onContextMenu={event =>
                          this.boxRightClicked(event, i, j)
                        }
                      >
                        {this.renderSquares(i, j)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MineSweeper;
