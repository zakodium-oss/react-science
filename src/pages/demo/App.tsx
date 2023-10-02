import { KbsProvider } from 'react-kbs';

import { AppStateProvider } from '../../app-data';
import { RootLayout, FullScreenProvider } from '../../components';

import MainLayout from './MainLayout';

import '@blueprintjs/core/lib/css/blueprint.css';

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
