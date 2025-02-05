import { QueryClientProvider } from '@tanstack/react-query';
import { FifoLogger } from 'fifo-logger';
import { KbsProvider } from 'react-kbs';

import { AppStateProvider } from '../../app-data/index.js';
import {
  FifoLoggerProvider,
  FullScreenProvider,
  RootLayout,
} from '../../components/index.js';

import MainLayout from './MainLayout.js';
import { queryClient } from './query_client.js';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

const fifoLogger = new FifoLogger({ level: 'debug' });

export default function App() {
  return (
    <FifoLoggerProvider logger={fifoLogger}>
      <FullScreenProvider>
        <RootLayout>
          <QueryClientProvider client={queryClient}>
            <KbsProvider>
              <AppStateProvider>
                <MainLayout />
              </AppStateProvider>
            </KbsProvider>
          </QueryClientProvider>
        </RootLayout>
      </FullScreenProvider>
    </FifoLoggerProvider>
  );
}
