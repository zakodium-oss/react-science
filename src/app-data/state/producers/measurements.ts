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
      color: { kind: 'fixed', color: 'red' },
      visible: true,
    };
  }
};

export const unselectedMeasurement: AppStateProducer<'UNSELECT_MEASUREMENT'> = (
  draft,
  action,
) => {
  // Check the measurement exists
  getMeasurementOrFail(
    draft.data.measurements,
    action.payload.kind,
    action.payload.id,
  );

  draft.view.selectedKind = action.payload.kind;
  const oldState = draft.view.selectedMeasurements[action.payload.kind] || [];

  draft.view.selectedMeasurements[action.payload.kind] = oldState.filter(
    (element) => element !== action.payload.id,
  );
};

export const addSelectedMeasurement: AppStateProducer<
  'ADD_SELECTED_MEASUREMENT'
> = (draft, action) => {
  // Check the measurement exists
  getMeasurementOrFail(
    draft.data.measurements,
    action.payload.kind,
    action.payload.id,
  );

  draft.view.selectedKind = action.payload.kind;
  const oldState = draft.view.selectedMeasurements[action.payload.kind] || [];
  draft.view.selectedMeasurements[action.payload.kind] = [
    ...oldState,
    action.payload.id,
  ];
};

export const selectMeasurement: AppStateProducer<'SELECT_MEASUREMENT'> = (
  draft,
  action,
) => {
  // Check the measurement exists
  getMeasurementOrFail(
    draft.data.measurements,
    action.payload.kind,
    action.payload.id,
  );

  draft.view.selectedKind = action.payload.kind;
  draft.view.selectedMeasurements[action.payload.kind] = [action.payload.id];
};

/*

  const oldState = draft.view.selectedMeasurements[action.payload.kind] || [];
  draft.view.selectedMeasurements[action.payload.kind] = [
    ...oldState,
    action.payload.id,
  ];
*/

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
