import React, { Component } from 'react';
import Game from '../../game';
import SlidingPuzzle from '../sliding-puzzle';
import styles from './styles.styl';

export default class Controls extends Component {
  constructor(props) {
    super(props);
    const newGame = new Game()
      .setGridSize(3)
      .shuffle();
    this.state = {
      game: newGame,
      gridSize: newGame.gridSize,
      dimensions: 600,
      played: 1
    };
  }

  setGridSize(gridSize) {
    this.state.game.setGridSize(gridSize);
    this.setState({ gridSize });
  }

  shuffle() {
    this.state.game.shuffle();
    this.setState({ played: this.state.played + 1 });
  }

  render() {
    const { game, dimensions, gridSize } = this.state,
      myWrapperStyles = { width: `${dimensions}px` }
    return (
      <div>
        <div className={styles.wrapper} style={myWrapperStyles}>
          <div>
            <label htmlFor="gridSize">Grid Size: </label>
            <input id="gridSize" defaultValue={gridSize} ref="gridSize" type="number" min="2" max="10" onChange={() => {
              this.setGridSize(this.refs.gridSize.value);
            } }/>
          </div>
          <div>
            <label htmlFor="dimensions">Dimensions: </label>
            <input id="dimensions" defaultValue={dimensions} ref="dimensions" type="number" min="300" max="1500" onChange={() => {
              this.setState({ dimensions: this.refs.dimensions.value });
            } }/>
          </div>
          <div>
            <input type="button" value="Shuffle" onClick={this.shuffle.bind(this)} />
          </div>
        </div>
        <SlidingPuzzle game={game} dimensions={dimensions} gridSize={gridSize} />
      </div>
    );
  }
}
