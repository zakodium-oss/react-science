import produce, { Draft } from 'immer';
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

import { assertUnreachable } from '../../utils/assert';
import { mergeMeasurements } from '../loaders/index';

import {
  DataState,
  Measurements,
  getEmptyDataState,
  MeasurementKind,
  kindLabels,
  getFirstMeasurementOrFail,
  getMeasurementOrFail,
  iterateMeasurementEntries,
  MeasurementKindAndId,
} from './data/index';

export interface MeasurementDisplay {
  lineStroke: string;
}

export interface AppState {
  data: DataState;
  isLoading: boolean;
  view: {
    selectedMeasurements: Partial<Record<MeasurementKind, Array<string>>>;
    selectedKind?: MeasurementKind;
    measurements: Record<string, MeasurementDisplay>;
  };
}

export function getEmptyAppState(): AppState {
  return {
    data: getEmptyDataState(),
    isLoading: false,
    view: {
      selectedMeasurements: {},
      measurements: {},
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
  | { type: 'ADD_MEASUREMENTS'; payload: Partial<Measurements> }
  | { type: 'LOAD_STATE'; payload: Omit<AppState, 'isLoading'> }
  | {
      type: 'SELECT_MEASUREMENT';
      payload: MeasurementKindAndId;
    }
  | { type: 'SELECT_MEASUREMENT_KIND'; payload: MeasurementKind }
  | {
      type: 'CHANGE_MEASUREMENT_DISPLAY';
      payload: {
        measurement: MeasurementKindAndId;
        display: Partial<MeasurementDisplay>;
      };
    };

function actionHandler(draft: Draft<AppState>, action: AppStateAction) {
  const type = action.type;
  switch (type) {
    case 'RESET':
      draft.data = getEmptyDataState();
      return;
    case 'ADD_MEASUREMENTS': {
      const newMeasurements = action.payload;
      mergeMeasurements(draft.data.measurements, newMeasurements);

      for (const kind of Object.keys(kindLabels).filter(
        (k) => k in newMeasurements,
      ) as MeasurementKind[]) {
        if (
          !draft.view.selectedMeasurements[kind] &&
          draft.data.measurements[kind].entries.length > 0
        ) {
          const { measurement } = getFirstMeasurementOrFail(
            draft.data.measurements,
            kind,
          );
          const id = measurement.id;
          draft.view.selectedMeasurements[kind] = [id];
          if (draft.view.selectedKind === undefined) {
            draft.view.selectedKind = kind;
          }
        }
      }

      for (let measurement of iterateMeasurementEntries(newMeasurements)) {
        draft.view.measurements[measurement.id] = {
          lineStroke: 'red',
        };
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

      draft.view.selectedKind = action.payload.kind;
      draft.view.selectedMeasurements[action.payload.kind] = [
        action.payload.id,
      ];
      return;
    }
    case 'SELECT_MEASUREMENT_KIND': {
      const selected = draft.view.selectedMeasurements[action.payload]?.[0];
      if (selected) {
        draft.view.selectedKind = action.payload;
      } else if (draft.data.measurements[action.payload].entries.length > 0) {
        const measurement = draft.data.measurements[action.payload].entries[0];
        draft.view.selectedMeasurements[action.payload] = [measurement.id];
        draft.view.selectedKind = action.payload;
      } else {
        draft.view.selectedKind = undefined;
      }
      return;
    }
    case 'CHANGE_MEASUREMENT_DISPLAY': {
      const measurement = getMeasurementOrFail(
        draft.data.measurements,
        action.payload.measurement.kind,
        action.payload.measurement.id,
      );
      draft.view.measurements[measurement.id] = {
        ...draft.view.measurements[measurement.id],
        ...action.payload.display,
      };
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
    case 'LOAD_STATE': {
      const { data, view } = action.payload;
      draft.data = data;
      draft.view = view;
      return;
    }

    default:
      assertUnreachable(type);
  }
}
