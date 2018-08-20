import React, { Component } from 'react';
import MineSweeper from './MineSweeper'

class Difficulty extends Component {

    constructor(props) {
        super(props);
        this.state = {
          difficulty: 0
        };
    
    componentDidUpdate() {
        this.setState({
            difficulty: difficultySelector
        })
        <MineSweeper difficultyLevel={this.props.difficulty} />
    }

     
    
    render() {
        return (
            <div>
                <h1>Choose your Difficulty!</h1>
                <select name='difficultySelector' className='difficultySelector'>
                    <option value='0' selected>Easy</option>
                    <option value='1'>Medium</option>
                    <option value='2'>Hard</option>
                </select>
            </div>
        );
    }
}

export default Difficulty;
