import React, { Component } from 'react';
import styles from './styles.styl';

const Tile = (props) => {
  const { item, dimensions, size, onClick, tileIndex } = props,
    { id } = item,
    index = id,
    x = index % size,
    y = parseInt(index / size);
  let last = {},
    myStyles = {
      height: `${100 / size}%`,
      width: `${100 / size}%`,
      backgroundSize: `${dimensions}px ${dimensions}px`,
      backgroundPosition: `${100 / (size - 1) * x}% ${100 / (size - 1) * y}%`
    };
  if (index === (size * size) - 1) {
    myStyles.background = 'none';
    last.display = 'none';
  }
  return (
    <div className={styles.tile} style={myStyles} onClick={() => {
        if (index !== (size * size) - 1) {
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
    if (this.props.game.won) {
      alert('You have won!');
    }
  }

  render() {
    const { game, dimensions } = this.props,
      { size, elements } = game,
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
            <Tile item={item} key={index} tileIndex={index} dimensions={dimensions} size={size} onClick={({ id, index }) => {
              this.setState({ moves: this.state.moves + 1 });
              game.move({ id, index });
            }} /> )}
        </div>
      </main>
    );
  }
}
