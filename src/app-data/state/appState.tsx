import produce from 'immer';
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

import { AppStateAction } from './appStateActions';
import { DataState, getEmptyDataState } from './data/index';
import { appStateProducer } from './producers/index';
import { getEmptyViewState, ViewState } from './view/index';

export interface AppState {
  data: DataState;
  view: ViewState;
}

function getEmptyAppState(): AppState {
  return {
    data: getEmptyDataState(),
    view: getEmptyViewState(),
  };
}

const appStateContext = createContext<AppState | null>(null);

export function useAppState(): AppState {
  const appState = useContext(appStateContext);
  if (!appState) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return appState;
}

export type AppDispatch = Dispatch<AppStateAction>;

const appDispatchContext = createContext<AppDispatch | null>(null);

export function useAppDispatch(): AppDispatch {
  const appDispatch = useContext(appDispatchContext);
  if (!appDispatch) {
    throw new Error('useAppDispatch must be used within an AppStateProvider');
  }
  return appDispatch;
}

const appReducer = produce(appStateProducer);

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
