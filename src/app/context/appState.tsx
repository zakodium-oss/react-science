import produce, { Draft } from 'immer';
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

import {
  DataState,
  Measurements,
  mergeMeasurements,
  getEmptyDataState,
} from '../../data/DataState';
import { assertUnreachable } from '../../utils/assert';

import { getFirstMeasurement, getMeasurementOrFail } from './data.helpers';

interface AppState {
  data: DataState;
  isLoading: boolean;
  view: {
    selectedMeasurement?: string;
  };
}

function getEmptyAppState(): AppState {
  return {
    data: getEmptyDataState(),
    isLoading: false,
    view: {},
  };
}

const appStateContext = createContext<AppState | null>(null);
const appDispatchContext = createContext<React.Dispatch<AppStateAction> | null>(
  null,
);

export function useAppState() {
  const appState = useContext(appStateContext);
  if (!appState) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return appState;
}

export function useAppDispatch() {
  const appState = useContext(appDispatchContext);
  if (!appState) {
    throw new Error(
      'useAppDispatch must be used within an AppDispatchProvider',
    );
  }
  return appState;
}

export function AppStateProvider(props: { children: ReactNode }) {
  const [appState, appDispatch] = useReducer(appReducer, getEmptyAppState());
  return (
    <appDispatchContext.Provider value={appDispatch}>
      <appStateContext.Provider value={appState}>
        {props.children}
      </appStateContext.Provider>
    </appDispatchContext.Provider>
  );
}

export type AppDispatch = Dispatch<AppStateAction>;

function appReducer(state: AppState, action: AppStateAction) {
  return produce(state, (draft) => {
    return actionHandler(draft, action);
  });
}

type AppStateAction =
  | { type: 'RESET' }
  | { type: 'LOAD_START' }
  | { type: 'LOAD_END' }
  | { type: 'ADD_MEASUREMENTS'; payload: Measurements }
  | { type: 'SELECT_MEASUREMENT'; payload: string };

function actionHandler(draft: Draft<AppState>, action: AppStateAction) {
  const type = action.type;
  switch (type) {
    case 'RESET':
      draft.data = getEmptyDataState();
      return;
    case 'ADD_MEASUREMENTS': {
      mergeMeasurements(draft.data.measurements, action.payload);
      if (!draft.view.selectedMeasurement) {
        const measurement = getFirstMeasurement(draft.data.measurements);
        if (measurement) {
          draft.view.selectedMeasurement = measurement.measurement.id;
        }
      }
      return;
    }
    case 'SELECT_MEASUREMENT': {
      const { measurement } = getMeasurementOrFail(
        draft.data.measurements,
        action.payload,
      );

      draft.view.selectedMeasurement = measurement.id;
      return;
    }
    case 'LOAD_START': {
      draft.isLoading = true;
      return;
    }
    case 'LOAD_END': {
      draft.isLoading = false;
      return;
    }
    default:
      assertUnreachable(type);
  }
}
