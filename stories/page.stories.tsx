import { Meta } from '@storybook/react';
import React from 'react';

import App from '../src/App';

export default {
  title: 'Default',
} as Meta;

export function Control() {
  return <App />;
}
