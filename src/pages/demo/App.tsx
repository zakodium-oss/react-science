import { KbsProvider } from 'react-kbs';

import { AppStateProvider } from '../../app-data';
import {
  FifoLoggerProvider,
  FullScreenProvider,
  RootLayout,
} from '../../components';

import MainLayout from './MainLayout';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import { FifoLogger } from 'fifo-logger';

const fifoLogger = new FifoLogger({ level: 'debug' });

export default function App() {
  return (
    <FifoLoggerProvider logger={fifoLogger}>
      <FullScreenProvider>
        <RootLayout>
          <KbsProvider>
            <AppStateProvider>
              <MainLayout />
            </AppStateProvider>
          </KbsProvider>
        </RootLayout>
      </FullScreenProvider>
    </FifoLoggerProvider>
  );
}
