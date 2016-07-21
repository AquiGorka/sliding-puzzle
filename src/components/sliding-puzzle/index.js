import React, { Component, PropTypes } from 'react';
import styles from './styles.styl';

const Tile = (props) => {
  const { item, dimensions, gridSize, onClick, tileIndex } = props;
  const { id } = item;
  const index = id;
  const x = index % gridSize;
  const y = parseInt(index / gridSize, 10);
  const last = {};
  const myStyles = {
    height: `${100 / gridSize}%`,
    width: `${100 / gridSize}%`,
    backgroundSize: `${dimensions}px`,
    backgroundPosition: `${100 / (gridSize - 1) * x}% ${100 / (gridSize - 1) * y}%`,
  };
  if (index === (gridSize * gridSize) - 1) {
    myStyles.backgroundImage = 'none';
    last.display = 'none';
  }
  return (
    <div
      className={styles.tile}
      style={myStyles}
      onClick={() => {
        if (index !== (gridSize * gridSize) - 1) {
          onClick({ id, index: tileIndex });
        }
      }}
    >
      <div className={styles['tile-id']} style={last}>{id + 1}</div>
    </div>
  );
};

Tile.propTypes = {
  item: PropTypes.object,
  dimensions: PropTypes.number,
  gridSize: PropTypes.number,
  onClick: PropTypes.func,
  tileIndex: PropTypes.number,
};

export default class SlidingPuzzle extends Component {
  static propTypes = {
    game: PropTypes.object,
    dimensions: PropTypes.number,
    gridSize: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = { moves: 0 };
  }

  onClick = ({ id, index }) => {
    if (this.props.game.move({ id, index })) {
      this.setState({ moves: this.state.moves + 1 }, () => {
        if (this.props.game.won && this.state.moves) {
          alert('You have won!');
          this.setState({ moves: 0 });
        }
      });
    }
  }

  render() {
    const { game, dimensions, gridSize } = this.props;
    const { elements } = game;
    const myStyles = {
      height: `${dimensions}px`,
      width: `${dimensions}px`,
    };
    return (
      <main className={styles.app} style={myStyles}>
        <div className={styles.bg}></div>
        <div className={styles.wrapper}>
          {elements.map((item, index) =>
            <Tile
              item={item}
              key={index}
              tileIndex={index}
              dimensions={dimensions}
              gridSize={gridSize}
              onClick={this.onClick}
            />
          )}
        </div>
      </main>
    );
  }
}
