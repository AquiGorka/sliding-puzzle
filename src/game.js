class Item {
  constructor({ index, size }) {
    this.id = index + 1;
    this.index = index;
    this.x = index % size;
    this.y = parseInt(index / size);
  }
}

export default class Game {
  constructor({ elements = 9 }) {
    this.size = Math.sqrt(elements);
    this.elements = (new Array(elements)).fill()
      .map((item, index) => new Item({ index, size: this.size }));
  }
}
