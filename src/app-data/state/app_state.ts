import { produce } from 'immer';
import type { Dispatch } from 'react';
import { createContext, use } from 'react';

import type { AppStateAction } from './app_state.actions.js';
import type { AppData } from './data/index.js';
import { getEmptyAppData } from './data/index.js';
import { appStateProducer } from './producers/index.js';
import type { AppSettings } from './settings/index.js';
import { getEmptyAppSettings } from './settings/index.js';
import type { AppView } from './view/index.js';
import { getEmptyAppView } from './view/index.js';

export interface AppState {
  load: AppLoad;
  data: AppData;
  view: AppView;
  settings: AppSettings;
}

export interface AppLoad {
  isLoading: boolean;
}

export function getEmptyAppState(): AppState {
  return {
    load: {
      isLoading: false,
    },
    data: getEmptyAppData(),
    view: getEmptyAppView(),
    settings: getEmptyAppSettings(),
  };
}

export const AppStateContext = createContext<AppState | null>(null);

export function useAppState(): AppState {
  const appState = use(AppStateContext);
  if (!appState) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return appState;
}

export type AppDispatch = Dispatch<AppStateAction>;

export const AppDispatchContext = createContext<AppDispatch | null>(null);

export function useAppDispatch(): AppDispatch {
  const appDispatch = use(AppDispatchContext);
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

export const appReducer = produce(appStateProducer);
