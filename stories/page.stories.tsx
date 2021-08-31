import { Meta } from '@storybook/react';
import React from 'react';

import App from '../src/App';
import '../public/normalize.css';

export default {
  title: 'Default',
} as Meta;

export function Control() {
  return (
    <>
      <App />
      <button type="button">Normalized button</button>
    </>
  );
}
