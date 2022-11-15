import { KbsProvider } from 'react-kbs';

import { AppStateProvider } from '../../app-data/index';
import { RootLayout, FullScreenProvider } from '../../components/index';

import MainLayout from './MainLayout';

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
