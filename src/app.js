import React from 'react';
import styles from './app.styl';

const Tile = (props) => {
  const { x, y, id, size, dimensions } = props;
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
  const { size, dimensions, image } = props,
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
        {(new Array(size)).fill(0).map(i => {
          y++;
          return (new Array(size)).fill(0).map(j => {
            x++;
            if (x > size - 1) {
              x = 0;
            }
            id++;
            return <Tile x={x} y={y} id={id} key={id} size={size} dimensions={dimensions} />
          })
        })}
      </div>
		</main>
	);
};
