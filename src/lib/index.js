Array.prototype.pushItem = Array.pushItem || function(value) {
  if (value !== undefined && value !== null) {
    this.push(value);
  }
  return this;
};

Array.prototype.compare = Array.compare || function(compareTo) {
  return JSON.stringify(this) === JSON.stringify(compareTo);
};

Array.prototype.swap = Array.swap || function(from, to) {
  let newArray = this.concat([]);
  let aux = newArray[from];
  newArray[from] = newArray[to];
  newArray[to] = aux;
  return newArray;
};

Array.prototype.shuffle = Array.shuffle || function() {
  return this.slice().sort(shuffle);
};

export const shuffle = () => {
  return getRandomInt(-1, 1);
};

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getGridNeighborIndexDown = ({ index, gridSize }) => {
  if (index >= ((gridSize * gridSize) - gridSize)) {
    return null;
  }
  const nX = index % gridSize,
    nY = parseInt(index / gridSize) + 1;
  return nX + (nY * gridSize);
}

export const getGridNeighborIndexLeft = ({ index, gridSize }) => {
  if (index % gridSize === 0) {
    return null;
  }
  const nX = index % gridSize - 1,
    nY = parseInt(index / gridSize);
  return nX + (nY * gridSize);
}

export const getGridNeighborIndexRight = ({ index, gridSize }) => {
  if (index % gridSize === gridSize - 1) {
    return null;
  }
  const nX = index % gridSize + 1,
    nY = parseInt(index / gridSize);
  return nX + (nY * gridSize);
}

export const getGridNeighborIndexUp = ({ index, gridSize }) => {
  if (parseInt(index / gridSize) === 0) {
    return null;
  }
  const nX = index % gridSize,
    nY = parseInt(index / gridSize) - 1;
  return nX + (nY * gridSize);
}
