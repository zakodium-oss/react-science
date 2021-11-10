import React from 'react';
import ReactDOM from 'react-dom';

import { RootLayout } from '..';

import App from './App';

import './main.css';

ReactDOM.render(
  <React.StrictMode>
    <RootLayout>
      <App />
    </RootLayout>
  </React.StrictMode>,
  document.getElementById('root'),
);
