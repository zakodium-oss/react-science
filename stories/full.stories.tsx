import { Meta } from '@storybook/react';
import React from 'react';

import App from '../src/app/App';

export default {
  title: 'Layout/Full app',
} as Meta;

export function FullExample() {
  return <App />;
}
