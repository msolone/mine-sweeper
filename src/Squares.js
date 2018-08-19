import React, { Component } from 'react';

class Squares extends Component {

    boxClicked = (i, j) => {
        console.log("box clicked ", i, j)
        fetch(`${BASE_URL}games/${this.state.game.id}/check`, {
            method:"POST", 
            body:JSON.stringify({col: i, row: j})
        }).then (resp => resp.json())
        .then(lastGameData => {
            console.log(lastGameData)
            this.setState({
                game: lastGameData
            })  
        })
  
    }

    render() {
        <td className='squares' onClick={() => this.boxClicked(i,j)}>{this.state.game.board[i][j]}</td>;
    }
}

export default Squares;
