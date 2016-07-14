import React from 'react';
import { render } from 'react-dom'
import App from './app.js';

//
document.addEventListener( 'DOMContentLoaded', () => render(
  <App dimensions={500} size={4} />, document.getElementById('root') ) );
