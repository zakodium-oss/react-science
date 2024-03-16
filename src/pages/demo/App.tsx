import { KbsProvider } from 'react-kbs';

import { AppStateProvider } from '../../app-data';
import { FullScreenProvider, RootLayout } from '../../components';

import MainLayout from './MainLayout';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

export default function App() {
  return (
    <FullScreenProvider>
      <RootLayout>
        <KbsProvider>
          <AppStateProvider>
            <MainLayout />
          </AppStateProvider>
        </KbsProvider>
      </RootLayout>
    </FullScreenProvider>
  );
}
