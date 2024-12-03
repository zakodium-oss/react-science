import type { Draft } from 'immer';

import type { AppStateAction } from '../app_state.actions.js';
import type { AppState } from '../app_state.js';

import { addMeasurements } from './measurements/addMeasurements.js';
import {
  changeMeasurementDisplay,
  changeMeasurementsDisplay,
  removeSelectedMeasurements,
  selectMeasurement,
  selectMeasurementKind,
  selectOrUnselectAllMeasurements,
  setMeasurementVisibility,
  setSelectedMeasurementVisibility,
} from './measurements/measurements.js';
import {
  ivPlotSelectVariable,
  plotZoom,
  plotZoomOut,
} from './plot-view/plot-view.js';
import type { ActionType, AppStateProducer } from './types.js';

export const loadFullState: AppStateProducer<'LOAD_FULL_STATE'> = (
  draft,
  action,
) => {
  const { data, view } = action.payload;
  draft.data = data;
  draft.view = view;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const producers: Record<ActionType, AppStateProducer<any>> = {
  LOAD_START: (draft) => {
    draft.load.isLoading = true;
  },
  LOAD_STOP: (draft) => {
    draft.load.isLoading = false;
  },
  PLOT_ZOOM: plotZoom,
  PLOT_ZOOM_OUT: plotZoomOut,
  ADD_MEASUREMENTS: addMeasurements,
  SELECT_MEASUREMENT: selectMeasurement,
  SELECT_MEASUREMENT_KIND: selectMeasurementKind,
  SELECT_ALL_MEASUREMENTS: selectOrUnselectAllMeasurements,
  SET_MEASUREMENT_VISIBILITY: setMeasurementVisibility,
  SET_SELECTED_MEASUREMENTS_VISIBILITY: setSelectedMeasurementVisibility,
  CHANGE_MEASUREMENT_DISPLAY: changeMeasurementDisplay,
  CHANGE_MEASUREMENTS_DISPLAY: changeMeasurementsDisplay,
  LOAD_FULL_STATE: loadFullState,
  REMOVE_SELECTED_MEASUREMENTS: removeSelectedMeasurements,
  IV_PLOT_SELECT_VARIABLE: ivPlotSelectVariable,
};

export function appStateProducer(
  draft: Draft<AppState>,
  action: AppStateAction,
) {
  const producer = producers[action.type];
  if (!producer) {
    throw new Error(`Missing producer for action type ${action.type}`);
  }
  producer(draft, action);
}
