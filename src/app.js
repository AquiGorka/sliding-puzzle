import React from 'react';
import styles from './app.styl';

const Tile = (props) => {
  const { item, dimensions, size } = props;
  const { x, y, id } = item;
  let myStyles = {
      height: `${100 / size}%`,
      width: `${100 / size}%`,
      backgroundSize: `${dimensions}px ${dimensions}px`,
      backgroundPosition: `${100 / (size - 1) * x}% ${100 / (size - 1) * y}%`
    };
  if (x === size - 1 && y === size - 1) {
    myStyles.background = 'none';
  }
  return (
    <div className={styles.tile} style={myStyles}>
      <div className={styles['tile-id']}>{id}</div>
    </div>
  );
}
//

export default (props) => {
  const { game, dimensions } = props,
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
          <Tile item={item} key={index} dimensions={dimensions} size={size} /> )}
      </div>
		</main>
	);
};
