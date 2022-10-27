import produce, { Draft } from 'immer';
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

import { assertUnreachable } from '../../utils/assert';
import {
  DataState,
  Measurements,
  mergeMeasurements,
  getEmptyDataState,
  MeasurementKind,
  measurementKinds,
} from '../data/DataState';

import { getFirstMeasurement, getMeasurementOrFail } from './data.helpers';

export interface AppState {
  data: DataState;
  isLoading: boolean;
  view: {
    selectedMeasurements: Partial<Record<MeasurementKind, Array<string>>>;
    currentMeasurement?: {
      kind: MeasurementKind;
      ids: Array<string>;
    };
  };
}

function getEmptyAppState(): AppState {
  return {
    data: getEmptyDataState(),
    isLoading: false,
    view: {
      selectedMeasurements: {},
    },
  };
}

const appStateContext = createContext<AppState | null>(null);
const appDispatchContext = createContext<Dispatch<AppStateAction> | null>(null);

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
  | {
      type: 'SELECT_MEASUREMENT';
      payload: { id: string; kind: MeasurementKind };
    }
  | { type: 'SELECT_MEASUREMENT_KIND'; payload: MeasurementKind };

function actionHandler(draft: Draft<AppState>, action: AppStateAction) {
  const type = action.type;
  switch (type) {
    case 'RESET':
      draft.data = getEmptyDataState();
      return;
    case 'ADD_MEASUREMENTS': {
      mergeMeasurements(draft.data.measurements, action.payload);
      for (let kind of measurementKinds) {
        if (!draft.view.selectedMeasurements[kind]) {
          const measurement = getFirstMeasurement(
            draft.data.measurements,
            kind,
          );
          if (measurement) {
            const id = measurement.measurement.id;
            draft.view.selectedMeasurements[kind] = [id];
            if (draft.view.currentMeasurement === undefined) {
              draft.view.currentMeasurement = { ids: [id], kind };
            }
            // draft.view.currentMeasurement = {
            //   kind,
            //   id: measurement.measurement.id,
            // };
          }
        }
      }

      return;
    }
    case 'SELECT_MEASUREMENT': {
      // Check the measurement exists
      getMeasurementOrFail(
        draft.data.measurements,
        action.payload.kind,
        action.payload.id,
      );
      const { id, kind } = action.payload;
      if (
        draft.view.currentMeasurement &&
        draft.view.selectedMeasurements[kind] &&
        draft.view.currentMeasurement.kind === kind
      ) {
        if (draft.view.currentMeasurement.ids.includes(id)) {
          draft.view.currentMeasurement.ids =
            draft.view.currentMeasurement.ids.filter((s) => s !== id);
          draft.view.selectedMeasurements[kind] =
            draft.view.selectedMeasurements[kind]?.filter((s) => s !== id);
        } else {
          draft.view.currentMeasurement.ids.push(id);
          draft.view.selectedMeasurements[kind]?.push(id);
        }
      } else {
        draft.view.currentMeasurement = { ids: [id], kind };
        draft.view.selectedMeasurements[kind] = [id];
      }

      return;
    }
    case 'SELECT_MEASUREMENT_KIND': {
      const selected = draft.view.selectedMeasurements[action.payload];
      if (selected) {
        draft.view.currentMeasurement = {
          ids: selected,
          kind: action.payload,
        };
      } else if (draft.data.measurements[action.payload].entries.length > 0) {
        const measurement = draft.data.measurements[action.payload].entries[0];
        draft.view.selectedMeasurements[action.payload] = [measurement.id];
        draft.view.currentMeasurement = {
          ids: [measurement.id],
          kind: action.payload,
        };
      } else {
        draft.view.currentMeasurement = undefined;
      }
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
