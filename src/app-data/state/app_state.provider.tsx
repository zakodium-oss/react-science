import type { ReactNode } from 'react';
import { useReducer } from 'react';

import {
  AppDispatchContext,
  AppStateContext,
  appReducer,
  getEmptyAppState,
} from './app_state.js';

export function AppStateProvider(props: { children: ReactNode }) {
  const [appState, appDispatch] = useReducer(
    appReducer,
    null,
    getEmptyAppState,
  );
  return (
    <AppDispatchContext value={appDispatch}>
      <AppStateContext value={appState}>{props.children}</AppStateContext>
    </AppDispatchContext>
  );
}
