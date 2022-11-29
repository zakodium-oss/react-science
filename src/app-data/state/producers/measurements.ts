import {
  assert,
  assertUnreachable,
  defaultColorPalette,
} from '../../../components/index';
import {
  getFirstMeasurementOrFail,
  getMeasurementOrFail,
  iterateMeasurementEntries,
  kindLabels,
  MeasurementKind,
  mergeMeasurements,
} from '../../index';

import { AppStateProducer } from './types';

export const addMeasurements: AppStateProducer<'ADD_MEASUREMENTS'> = (
  draft,
  action,
) => {
  const newMeasurements = action.payload;

  const counts: Partial<Record<MeasurementKind, number>> = {};
  for (const [kind, measurements] of Object.entries(draft.data.measurements)) {
    counts[kind as MeasurementKind] = measurements.entries.length;
  }

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

  for (const { kind, measurement } of iterateMeasurementEntries(
    newMeasurements,
  )) {
    const count = counts[kind] ?? 0;
    draft.view.measurements[measurement.id] = {
      color: {
        kind: 'fixed',
        color: defaultColorPalette[count % defaultColorPalette.length],
      },
      visible: true,
    };
    counts[kind] = count + 1;
  }
};

export const selectOrUnselectAllMeasurements: AppStateProducer<
  'SELECT_ALL_MEASUREMENTS'
> = (draft, action) => {
  const {
    payload: { kind, select },
  } = action;

  draft.view.selectedKind = kind;
  draft.view.selectedMeasurements[kind] = select
    ? draft.data.measurements[kind].entries.map((element) => element.id)
    : [];
};

export const selectMeasurement: AppStateProducer<'SELECT_MEASUREMENT'> = (
  draft,
  action,
) => {
  const {
    payload: { acc, id, kind },
  } = action;

  // Check the measurement exists
  getMeasurementOrFail(draft.data.measurements, kind, id);
  draft.view.selectedKind = kind;

  const oldState = draft.view.selectedMeasurements[kind] || [];
  switch (acc) {
    case 'add': {
      draft.view.selectedMeasurements[kind] = [...oldState, id];
      break;
    }
    case 'remove': {
      draft.view.selectedMeasurements[kind] = oldState.filter(
        (element) => element !== id,
      );
      break;
    }
    case 'replace': {
      draft.view.selectedMeasurements[kind] = [id];
      break;
    }
    default:
      assertUnreachable(acc);
  }
};

export const selectMeasurementKind: AppStateProducer<
  'SELECT_MEASUREMENT_KIND'
> = (draft, action) => {
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
};

export const setMeasurementVisibility: AppStateProducer<
  'SET_MEASUREMENT_VISIBILITY'
> = (draft, action) => {
  const measurementView = draft.view.measurements[action.payload.id];
  measurementView.visible = action.payload.isVisible;
};

export const setSelectedMeasurementVisibility: AppStateProducer<
  'SET_SELECTED_MEASUREMENTS_VISIBILITY'
> = (draft, action) => {
  for (const id of draft.view.selectedMeasurements[action.payload.kind] || []) {
    const measurementView = draft.view.measurements[id];
    measurementView.visible = action.payload.isVisible;
  }
};

export const changeMeasurementDisplay: AppStateProducer<
  'CHANGE_MEASUREMENT_DISPLAY'
> = (draft, action) => {
  const measurement = getMeasurementOrFail(
    draft.data.measurements,
    action.payload.measurement.kind,
    action.payload.measurement.id,
  );

  draft.view.measurements[measurement.id] = {
    ...draft.view.measurements[measurement.id],
    ...action.payload.display,
  };
};

export const changeMeasurementsDisplay: AppStateProducer<
  'CHANGE_MEASUREMENTS_DISPLAY'
> = (draft, action) => {
  assert(draft.view.selectedKind);

  for (const id of draft.view.selectedMeasurements[draft.view.selectedKind] ||
    []) {
    draft.view.measurements[id] = {
      ...draft.view.measurements[id],
      ...action.payload.display,
    };
  }
};
