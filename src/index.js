import React from 'react';
import { render } from 'react-dom'
import Controls from './components/controls';

//
document.addEventListener( 'DOMContentLoaded', () => render(
  <Controls />, document.getElementById('root') ) );
