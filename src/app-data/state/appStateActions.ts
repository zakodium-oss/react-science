import { AppState } from './appState';
import {
  MeasurementKind,
  MeasurementKindAndId,
  Measurements,
} from './data/index';
import { MeasurementAppView } from './view/index';

type ActionType<Action, Payload = void> = Payload extends void
  ? { type: Action }
  : { type: Action; payload: Payload };

export type AppStateAction =
  | ActionType<'LOAD_START'>
  | ActionType<'LOAD_STOP'>
  | ActionType<'ADD_MEASUREMENTS', Partial<Measurements>>
  | ActionType<'LOAD_FULL_STATE', AppState>
  | ActionType<
      'SELECT_MEASUREMENT',
      MeasurementKindAndId & { acc: 'add' | 'remove' | 'replace' }
    >
  | ActionType<
      'SELECT_ALL_MEASUREMENTS',
      { select: boolean; kind: MeasurementKind }
    >
  | ActionType<'SELECT_MEASUREMENT_KIND', MeasurementKind>
  // if id is null, change all the measurement visibility
  | ActionType<
      'SET_MEASUREMENT_VISIBILITY',
      { id: string | null; isVisible: boolean }
    >
  | ActionType<
      'CHANGE_MEASUREMENT_DISPLAY',
      {
        measurement: MeasurementKindAndId;
        display: Partial<MeasurementAppView>;
      }
    >;
