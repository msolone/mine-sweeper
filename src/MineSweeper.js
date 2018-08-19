import React, { Component } from "react";
// import Squares from './Squares'
// import GameOver from "./GameOver";

const BASE_URL = "https://minesweeper-api.herokuapp.com/";

class MineSweeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        board: []
      }
    };
  }

  componentDidMount() {
    fetch(`${BASE_URL}games`, {
      method: "POST",
      body: JSON.stringify({difficulty: 0}), 
      headers: {
        "Content-Type": "application/json"
      },

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
          document.querySelector(".youLose").style.display = "inline";
          console.log(latestGameData);
          this.setState({
            game: latestGameData
          });
        } else if (latestGameData.state === "won") {

          document.querySelector(".youWin").style.display = "inline";
          console.log(latestGameData);
          this.setState({
            game: latestGameData
          });
        } else {
          console.log(latestGameData);
          this.setState({
            game: latestGameData
          });
        }
      });
  };

  boxRightClicked = (i, j) => {
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

  render() {
    return (
      <div className="game-display">
        <table className="game-board">
          {this.state.game.board.map((row, i) => {
            return (
              <tbody key={i}>
                <tr className="rows">
                  {row.map((col, j) => {
                    return (
                      <td
                        className="squares"
                        key={j}
                        onClick={() => this.boxClicked(i, j)}
                        onContextMenu={() => this.boxRightClicked(i, j)}
                      >
                        {this.state.game.board[i][j]}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}

export default MineSweeper;
