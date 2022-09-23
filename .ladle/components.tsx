import type { GlobalProvider } from '@ladle/react';
import { StrictMode } from 'react';

import { RootLayout } from '../src/components';

export const Provider: GlobalProvider = ({ children, globalState }) => (
  <StrictMode>
    <RootLayout
      style={{
        boxSizing: 'border-box',
        borderStyle: 'solid',
        borderColor: 'rgb(213, 213, 213)',
        borderWidth: '1px',
      }}
    >
      {children}
    </RootLayout>
  </StrictMode>
);
