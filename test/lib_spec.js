import * as lib from '../src/lib';

describe('Random int', () => {
  it('should return a random integer between max and min', () => {
    const times = 100;
    const max = 10;
    const min = 0;
    (new Array(times)).fill()
      .forEach(() => {
        const random = lib.getRandomInt(min, max);
        expect(random).toBeGreaterThan(min - 1);
        expect(random).not.toBeGreaterThan(max + 1);
      });
  });
});

describe('Shuffle', () => {
  it('should return a random integer between -1 and 1', () => {
    const times = 100;
    (new Array(times)).fill()
      .forEach(() => {
        const random = lib.getRandomInt(-1, 1);
        expect(random).toBeGreaterThan(-2);
        expect(random).not.toBeGreaterThan(2);
      });
  });
});

describe('Array prototype polyfill', () => {
  describe('push item', () => {
    it('should mutate the original array', () => {
      const myArray = [1, 2];
      myArray.pushItem(3);
      expect(myArray).not.toEqual([1, 2]);
    });
    it('should not push an item to the array if it is not null or undefined', () => {
      const myArray = [1, 2];
      myArray.pushItem(null);
      expect(myArray).toEqual([1, 2]);
      myArray.pushItem(undefined);
      expect(myArray).toEqual([1, 2]);
    });
    it('should push an item to the array only if it is not null or undefined', () => {
      const myArray = [1, 2];
      myArray.pushItem(3);
      expect(myArray).toEqual([1, 2, 3]);
      myArray.pushItem(0);
      expect(myArray).toEqual([1, 2, 3, 0]);
      myArray.pushItem(false);
      expect(myArray).toEqual([1, 2, 3, 0, false]);
    });
  });

  describe('compare', () => {
    it('should not mutate the original array', () => {
      const myArray = [1, 2];
      myArray.compare([1]);
      expect(myArray).toEqual(myArray);
    });
    it('should return false when comparing two different arrays', () => {
      const firstArray = [1, 2];
      const secondArray = [1, 3];
      expect(firstArray.compare(secondArray)).toEqual(false);
    });
    it('should return false when comparing two arrays with the same items but in a different order', () => { // eslint-disable-line max-len
      const firstArray = [1, 2];
      const secondArray = [2, 1];
      expect(firstArray.compare(secondArray)).toEqual(false);
    });
    it('should return true when comparing the same array in the same order', () => {
      const firstArray = [1, 2];
      const secondArray = [1, 2];
      expect(firstArray.compare(secondArray)).toEqual(true);
    });
  });

  describe('shuffle', () => {
    it('should not mutate the original array', () => {
      const myArray = [1, 2];
      myArray.shuffle();
      expect(myArray).toEqual(myArray);
    });
    it('should return an array of the same size it received', () => {
      const myArray = [1, 2];
      expect(myArray.shuffle().length).toEqual(myArray.length);
    });
    it('should return new arrays that are not in the same order at least one third of the time', () => { // eslint-disable-line max-len
      const myArray = [1, 2, 3];
      const times = 100;
      let sameOrder = 0;
      (new Array(times).fill().forEach(() => {
        const shuffledArray = myArray.shuffle();
        if (myArray.compare(shuffledArray)) {
          sameOrder++;
        }
      }));
      expect(sameOrder).not.toBeGreaterThan(66);
    });
  });

  describe('swap', () => {
    it('should not mutate the original array', () => {
      const myArray = [1, 2];
      myArray.swap(0, 1);
      expect(myArray).toEqual(myArray);
    });
    it('should swap the positions of two items in an array', () => {
      expect([1, 2].swap(0, 1)).toEqual([2, 1]);
      expect([1, 2, 3, 4].swap(0, 2)).toEqual([3, 2, 1, 4]);
      expect([1, 2, 3, 4, 5].swap(0, 3)).toEqual([4, 2, 3, 1, 5]);
    });
  });
});

// TODO
describe('Grid neighbors', () => {});
