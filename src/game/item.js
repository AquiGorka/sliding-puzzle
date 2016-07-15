import * as lib from '../lib';

export default class Item {
  constructor({ id, gridSize }) {
    this.id = id;
    this.gridSize = gridSize;
    this.myNeighbors = [];
  }

  get neighbors() {
    return this.myNeighbors.sort((a, b) => a - b);
  }

  getNeighbors({ index }) {
    this.myNeighbors = [];
    this.myNeighbors
      .pushItem(lib.getGridNeighborIndexUp({ index, gridSize: this.gridSize }))
      .pushItem(lib.getGridNeighborIndexDown({ index, gridSize: this.gridSize }))
      .pushItem(lib.getGridNeighborIndexLeft({ index, gridSize: this.gridSize }))
      .pushItem(lib.getGridNeighborIndexRight({ index, gridSize: this.gridSize }));
    return this;
  }
}
