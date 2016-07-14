import React from 'react';
import { render } from 'react-dom'
import App from './app.js';
import Game from './game';

const game = new Game({ elements: 4 });

//
document.addEventListener( 'DOMContentLoaded', () => render(
  <App game={game} dimensions={500} />, document.getElementById('root') ) );
