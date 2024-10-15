import { type AppState } from './app_state.js';
import {
  type MeasurementKind,
  type MeasurementKindAndId,
  type Measurements,
} from './data/index.js';
import type { MeasurementAppView, Plot2DZoom } from './view/index.js';

type ActionType<Action, Payload = void> = Payload extends void
  ? { type: Action }
  : { type: Action; payload: Payload };

export type AppStateAction =
  | ActionType<'LOAD_START'>
  | ActionType<'LOAD_STOP'>
  | ActionType<'ADD_MEASUREMENTS', Partial<Measurements>>
  | ActionType<'LOAD_FULL_STATE', AppState>
  | ActionType<'PLOT_ZOOM', { kind: MeasurementKind; zoom: Plot2DZoom }>
  | ActionType<'PLOT_ZOOM_OUT', { kind: MeasurementKind }>
  | ActionType<
      'SELECT_MEASUREMENT',
      MeasurementKindAndId & { acc: 'add' | 'remove' | 'replace' }
    >
  | ActionType<
      'SELECT_ALL_MEASUREMENTS',
      { select: boolean; kind: MeasurementKind }
    >
  | ActionType<'SELECT_MEASUREMENT_KIND', MeasurementKind>
  | ActionType<'SET_MEASUREMENT_VISIBILITY', { id: string; isVisible: boolean }>
  | ActionType<
      'SET_SELECTED_MEASUREMENTS_VISIBILITY',
      { kind: MeasurementKind; isVisible: boolean }
    >
  | ActionType<
      'CHANGE_MEASUREMENTS_DISPLAY',
      { display: Partial<MeasurementAppView> }
    >
  | ActionType<
      'CHANGE_MEASUREMENT_DISPLAY',
      {
        measurement: MeasurementKindAndId;
        display: Partial<MeasurementAppView>;
      }
    >
  | ActionType<'REMOVE_SELECTED_MEASUREMENTS', { kind: MeasurementKind }>
  | ActionType<
      'IV_PLOT_SELECT_VARIABLE',
      { axis: 'x' | 'y'; variable: string }
    >;
