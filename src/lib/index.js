/* eslint-disable no-extend-native */

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const shuffle = () => getRandomInt(-1, 1);

export const getGridNeighborIndexDown = ({ index, gridSize }) => {
  if (index >= ((gridSize * gridSize) - gridSize)) {
    return null;
  }
  const nX = index % gridSize;
  const nY = parseInt(index / gridSize, 10) + 1;
  return nX + (nY * gridSize);
};

export const getGridNeighborIndexLeft = ({ index, gridSize }) => {
  if (index % gridSize === 0) {
    return null;
  }
  const nX = index % gridSize - 1;
  const nY = parseInt(index / gridSize, 10);
  return nX + (nY * gridSize);
};

export const getGridNeighborIndexRight = ({ index, gridSize }) => {
  if (index % gridSize === gridSize - 1) {
    return null;
  }
  const nX = index % gridSize + 1;
  const nY = parseInt(index / gridSize, 10);
  return nX + (nY * gridSize);
};

export const getGridNeighborIndexUp = ({ index, gridSize }) => {
  if (parseInt(index / gridSize, 10) === 0) {
    return null;
  }
  const nX = index % gridSize;
  const nY = parseInt(index / gridSize, 10) - 1;
  return nX + (nY * gridSize);
};

Array.prototype.pushItem = Array.pushItem || function arrayPushItem(value) {
  if (value !== undefined && value !== null) {
    this.push(value);
  }
  return this;
};

Array.prototype.compare = Array.compare || function arrayCompare(compareTo) {
  return JSON.stringify(this) === JSON.stringify(compareTo);
};

Array.prototype.swap = Array.swap || function arraySwap(from, to) {
  const newArray = this.concat([]);
  const aux = newArray[from];
  newArray[from] = newArray[to];
  newArray[to] = aux;
  return newArray;
};

Array.prototype.shuffle = Array.shuffle || function arrayShuffle() {
  return this.slice().sort(shuffle);
};
