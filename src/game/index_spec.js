import Game from './index.js';
import Item from './item.js';

describe('Game', () => {
  describe('new game', () => {
    it('should create an instance of a game with a grid size of 0 and no elements as default', () => { // eslint-disable-line max-len
      const newGame = new Game();
      expect(newGame.gridSize).toEqual(0);
      expect(newGame.elements).toEqual([]);
    });
  });

  describe('set grid', () => {
    it('should set grid size to the appropriate size and elements length to the square of that size', () => { // eslint-disable-line max-len
      const newGame = new Game().setGridSize(2);
      expect(newGame.gridSize).toEqual(2);
      expect(newGame.elements.length).toEqual(4);
      const otherGame = new Game().setGridSize(10);
      expect(otherGame.gridSize).toEqual(10);
      expect(otherGame.elements.length).toEqual(100);
    });
    it('should throw an error if grid size is less than 2 or greater than 10', () => {
      const newGame = new Game();
      const setSmallInvalidGridSize = () => {
        newGame.setGridSize(1);
      };
      const setLargeInvalidGridSize = () => {
        newGame.setGridSize(1);
      };
      expect(setSmallInvalidGridSize).toThrowError('Invalid grid size');
      expect(setSmallInvalidGridSize).toThrowError(TypeError);
      expect(setSmallInvalidGridSize).toThrowError(TypeError, 'Invalid grid size');
      expect(setLargeInvalidGridSize).toThrowError('Invalid grid size');
      expect(setLargeInvalidGridSize).toThrowError(TypeError);
      expect(setLargeInvalidGridSize).toThrowError(TypeError, 'Invalid grid size');
    });
    it('should return the neighbors of any item sorted ASC', () => {
      const newGame = new Game().setGridSize(2);
      let previous;
      let ordered = true;
      newGame.elements.forEach(item => {
        previous = item.neighbors[0];
        item.neighbors.forEach(neighborIndex => {
          if (previous > neighborIndex) {
            ordered = false;
          }
          previous = neighborIndex;
        });
      });
      expect(ordered).toEqual(true);
    });
    it('should set the neighbors of each grid element correctly', () => {
      const newGame = new Game().setGridSize(2);
      const correctNeighborOrder = [
        [1, 2],
        [0, 3],
        [0, 3],
        [1, 2],
      ];
      expect(newGame.elements.map(item => item.neighbors)).toEqual(correctNeighborOrder);
    });
  });

  describe('shuffle', () => {
    it('should return the elements in a different order at least one third of the time', () => {
      const newGame = new Game().setGridSize(2);
      const times = 100;
      let sameOrder = 0;
      (new Array(times).fill().forEach(() => {
        const originalElements = newGame.elements.concat([]);
        newGame.shuffle();
        if (newGame.elements.compare(originalElements)) {
          sameOrder++;
        }
      }));
      expect(sameOrder).not.toBeGreaterThan(66);
    });
  });

  // TODO
  describe('move', () => {
    it('should return false if the move is not possible (can only move with the last item)', () => {}); // eslint-disable-line max-len
    it('should return true if the move is possible (can only move with the last item)', () => {});
    it('should not change the elements order after a move was not possible', () => {});
    it('should set the elements in the correct order after a move', () => {});
  });

  describe('winning', () => {
    it('should return false if the items are not in the correct order', () => {
      const newGame = new Game().setGridSize(10).shuffle().shuffle().shuffle();
      expect(newGame.won).toEqual(false);
    });
    it('should return true if the items are in the correct order', () => {
      const newGame = new Game().setGridSize(10);
      expect(newGame.won).toEqual(true);
    });
  });

  describe('Item', () => {
    describe('new item', () => {
      it('should set the items default values correctly when creating a new instance', () => {
        const newItem = new Item({ id: 1, gridSize: 2 });
        expect(newItem.id).toEqual(1);
        expect(newItem.gridSize).toEqual(2);
        expect(newItem.neighbors).toEqual([]);
      });
    });
  });
});

