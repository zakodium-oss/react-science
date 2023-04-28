import { produce } from 'immer';
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

import { AppStateAction } from './appStateActions';
import { AppData, getEmptyAppData } from './data/index';
import { appStateProducer } from './producers/index';
import { AppSettings } from './settings/AppSettings';
import { getEmptyAppSettings } from './settings/getEmptyAppSettings';
import { getEmptyAppView, AppView } from './view/index';

export interface AppState {
  load: AppLoad;
  data: AppData;
  view: AppView;
  settings: AppSettings;
}

export interface AppLoad {
  isLoading: boolean;
}

function getEmptyAppState(): AppState {
  return {
    load: {
      isLoading: false,
    },
    data: getEmptyAppData(),
    view: getEmptyAppView(),
    settings: getEmptyAppSettings(),
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

export function useAppData(): AppData {
  return useAppState().data;
}

export function useAppView(): AppView {
  return useAppState().view;
}

export function useAppSettings(): AppSettings {
  return useAppState().settings;
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
