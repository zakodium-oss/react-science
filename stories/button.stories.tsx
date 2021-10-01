import React from 'react';

import { Button } from '../src';

export default {
  title: 'Layout/Button',
};

export function Control() {
  return (
    <Button
      backgroundColor={{ basic: 'blue', hover: 'green' }}
      color={{ basic: 'white' }}
    >
      Hello, World!
    </Button>
  );
}
