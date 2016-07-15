import React, { Component } from 'react';
import Game from '../../game';
import SlidingPuzzle from '../sliding-puzzle';

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = { game: new Game({ elements: 9 }) };
  }
  render() {
    const { game } = this.state;

    return <SlidingPuzzle game={game} dimensions={500} />;
  }
}
