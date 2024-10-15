import { type ReactNode, useReducer } from 'react';

import {
  appDispatchContext,
  appReducer,
  appStateContext,
  getEmptyAppState,
} from './app_state.js';

export function AppStateProvider(props: { children: ReactNode }) {
  const [appState, appDispatch] = useReducer(
    appReducer,
    null,
    getEmptyAppState,
  );
  return (
    <appDispatchContext.Provider value={appDispatch}>
      <appStateContext.Provider value={appState}>
        {props.children}
      </appStateContext.Provider>
    </appDispatchContext.Provider>
  );
}
