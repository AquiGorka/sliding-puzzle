import * as lib from '../lib';
import Item from './item';

export default class Game {
  constructor() {
    this.elements = [];
    this.gridSize = 0;
  }
  move({ id, index }) {
    const me = this.elements.find(item => item.id === id);
    const indexToMoveTo = me.neighbors.find((neighborIndex) => {
      return this.elements[neighborIndex].id === (this.elements.length - 1);
    });
    if (indexToMoveTo !== undefined) {
      this.elements = this.elements.swap(index, indexToMoveTo);
      this.elements.forEach(
        (item, index) => item.getNeighbors({ index }));
    }
    return indexToMoveTo !== undefined;
  }
  get won() {
    return this.elements
      .filter((item, index) => item.id === index)
      .length === this.elements.length;
  }
  setGridSize( gridSize ) {
    if (gridSize < 2 || gridSize > 10) {
      throw new TypeError('Invalid grid size');
    }
    this.gridSize = gridSize;
    this.elements = (new Array(gridSize * gridSize)).fill()
      .map((item, index) => new Item({ id: index, gridSize })
        .getNeighbors({ index }));
    return this;
  }
  shuffle() {
    this.elements = this.elements.shuffle()
      .map((item, index) => item.getNeighbors({ index }));
    return this;
  }
}
