import { KbsProvider } from 'react-kbs';

import { AppStateProvider } from '../../app-data';
import { FullScreenProvider, RootLayout } from '../../components';

import MainLayout from './MainLayout';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

export default function App() {
  return (
    <RootLayout>
      <KbsProvider>
        <AppStateProvider>
          <FullScreenProvider>
            <MainLayout />
          </FullScreenProvider>
        </AppStateProvider>
      </KbsProvider>
    </RootLayout>
  );
}
