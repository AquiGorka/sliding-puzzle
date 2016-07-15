import React, { Component } from 'react';
import Game from '../../game';
import SlidingPuzzle from '../sliding-puzzle';
import styles from './styles.styl';

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: new Game({ elements: 9 }),
      elements: 3,
      dimensions: 700
    };
  }

  shuffle() {
    this.setState({ game: new Game({ elements: this.state.elements * this.state.elements }) });
  }

  render() {
    const { game, dimensions, elements } = this.state,
      myWrapperStyles = { width: dimensions }
    return (
      <div>
        <div className={styles.wrapper} style={myWrapperStyles}>
          <div>
            <label htmlFor="elements">Elements: </label>
            <input id="elements" defaultValue={elements} ref="elements" type="number" min="2" max="10" onChange={() => {
              this.setState({ elements: this.refs.elements.value });
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
        <SlidingPuzzle game={game} dimensions={dimensions} />
      </div>
    );
  }
}
