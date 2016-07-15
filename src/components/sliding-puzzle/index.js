import React, { Component } from 'react';
import styles from './styles.styl';

const Tile = (props) => {
  const { item, dimensions, gridSize, onClick, tileIndex } = props,
    { id } = item,
    index = id,
    x = index % gridSize,
    y = parseInt(index / gridSize);
  let last = {},
    myStyles = {
      height: `${100 / gridSize}%`,
      width: `${100 / gridSize}%`,
      backgroundSize: `${dimensions}px`,
      backgroundPosition: `${100 / (gridSize - 1) * x}% ${100 / (gridSize - 1) * y}%`
    };
  if (index === (gridSize * gridSize) - 1) {
    myStyles.backgroundImage = 'none';
    last.display = 'none';
  }
  return (
    <div className={styles.tile} style={myStyles} onClick={() => {
        if (index !== (gridSize * gridSize) - 1) {
          onClick({ id, index: tileIndex });
        }
      }}>
      <div className={styles['tile-id']} style={last}>{id + 1}</div>
    </div>
  );
}
//

export default class SlidingPuzzle extends Component {
  constructor(props) {
    super(props);
    this.state = { moves: 0 };
  }

  componentDidUpdate() {
    if (this.props.game.won && this.state.moves) {
      alert('You have won!');
      this.setState({ moves: 0 });
    }
  }

  render() {
    const { game, dimensions, gridSize } = this.props,
      { elements } = game,
      myStyles = {
        height: `${dimensions}px`,
        width: `${dimensions}px`
      };
    let x = -1,
      y = -1,
      id = 0;
    return (
      <main className={styles.app} style={myStyles}>
        <div className={styles.bg}></div>
        <div className={styles.wrapper}>
          {elements.map((item, index) =>
            <Tile item={item} key={index} tileIndex={index} dimensions={dimensions} gridSize={gridSize} onClick={({ id, index }) => {
              if (game.move({ id, index })) {
                this.setState({ moves: this.state.moves + 1 });
              }
            }} /> )}
        </div>
      </main>
    );
  }
}
