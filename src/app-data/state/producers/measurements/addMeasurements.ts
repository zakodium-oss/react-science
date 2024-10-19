import { assert, defaultColorPalette } from '../../../../components/index.js';
import { getPreferredVariable, mergeMeasurements } from '../../../index.js';
import {
  getFirstMeasurementOrFail,
  iterateMeasurementEntries,
  kindLabels,
  type MeasurementKind,
} from '../../index.js';
import { resetZoom, updateZoom } from '../plot-view/helpers/zoom.js';
import type { AppStateProducer } from '../types.js';

export const addMeasurements: AppStateProducer<'ADD_MEASUREMENTS'> = (
  draft,
  action,
) => {
  const newMeasurements = action.payload;

  // Count how many measurements of each kind are already present.
  const counts: Partial<Record<MeasurementKind, number>> = {};
  for (const [kind, measurements] of Object.entries(draft.data.measurements)) {
    counts[kind as MeasurementKind] = measurements.entries.length;
  }

  const initialCounts = { ...counts };

  // Merge the new measurements with the existing ones.
  mergeMeasurements(draft.data.measurements, newMeasurements);

  // Automatically select the first measurement of each kind.
  // Automatically select the kind of measurement that was added first.
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

  // Assign initial view state to the new measurements.
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

    updateZoom(draft, kind, measurement);
  }

  // Automatically select the IV variables for the first measurement.
  if (!initialCounts.iv && counts.iv) {
    const firstIvMeasurement = getFirstMeasurementOrFail(
      draft.data.measurements,
      'iv',
    );
    const ivPlotView = draft.view.plot.iv;
    assert(ivPlotView);
    const xVariable = getPreferredVariable(firstIvMeasurement.measurement, 'x');
    const yVariable = getPreferredVariable(firstIvMeasurement.measurement, 'y');
    if (xVariable && yVariable) {
      ivPlotView.xVariable = xVariable.label;
      ivPlotView.yVariable = yVariable.label;
    }
    resetZoom(draft, 'iv');
  }
};
