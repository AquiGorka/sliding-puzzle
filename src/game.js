Array.prototype.swap = function(from, to) {
  let aux = this[from];
  this[from] = this[to];
  this[to] = aux;
  return this;
};

const shuffle = () => {
  return parseInt(Math.random() * 10) > 5;
};

class Item {
  constructor({ id }) {
    this.id = id;
  }
  getDown({ siblings, index, size }) {
    if (index >= (size * size) - size) {
      return;
    }
    const nX = index % size,
      nY = parseInt(index / size) + 1;
    this.myNeighbors.push(nX + (nY * size));
  }
  getLeft({ siblings, index, size }) {
    if (index % size === 0) {
      return;
    }
    const nX = index % size - 1,
      nY = parseInt(index / size);
    this.myNeighbors.push(nX + (nY * size));
  }
  getRight({ siblings, index, size }) {
    if (index % size === size - 1) {
      return;
    }
    const nX = index % size + 1,
      nY = parseInt(index / size);
    this.myNeighbors.push(nX + (nY * size));
  }
  getUp({ siblings, index, size }) {
    if (parseInt(index / size) === 0) {
      return;
    }
    const nX = index % size,
      nY = parseInt(index / size) - 1;
    this.myNeighbors.push(nX + (nY * size));
  }
  get neighbors() {
    return this.myNeighbors.sort((a, b) => a - b);
  }
  setNeighbors({ siblings, index, size }) {
    this.myNeighbors = [];
    this.getUp({ siblings, index, size });
    this.getDown({ siblings, index, size });
    this.getLeft({ siblings, index, size });
    this.getRight({ siblings, index, size });
  }
}

export default class Game {
  constructor({ elements = 9 }) {
    this.size = Math.sqrt(elements);
    this.elements = (new Array(elements)).fill()
      .map((item, index) => new Item({ id: index }))
      .sort(shuffle);
    this.setNeighbors();
  }
  move({ id, index }) {
    const me = this.elements.find(item => item.id === id);
    const indexToMoveTo = me.neighbors.find(index => {
      return this.elements[index].id === ((this.size * this.size) - 1);
    });
    if (indexToMoveTo !== undefined) {
      this.elements.swap(index, indexToMoveTo);
      this.setNeighbors();
    }
  }
  get won() {
    return this.elements
      .filter((item, index) => item.id === index)
      .length === this.elements.length;
  }
  setNeighbors() {
    this.elements.forEach(
      (item, index, siblings) => item.setNeighbors({ siblings, index, size: this.size }));
  }
}
