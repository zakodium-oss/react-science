import type {
  AppState,
  MeasurementAndView,
  MeasurementKind,
} from '../../app-data/index.js';
import { iterateKindMeasurementsAndView } from '../../app-data/index.js';

export function splitEntries<Kind extends MeasurementKind>(
  appState: AppState,
  kind: Kind,
) {
  const selectedEntries: Array<MeasurementAndView<Kind>> = [];
  const unselectedEntries: Array<MeasurementAndView<Kind>> = [];
  const selectedMeasurements: string[] =
    appState.view.selectedMeasurements[kind] ?? [];

  for (const entry of iterateKindMeasurementsAndView(appState, kind)) {
    if (selectedMeasurements.includes(entry.measurement.id)) {
      selectedEntries.push(entry);
    } else {
      unselectedEntries.push(entry);
    }
  }

  return { selectedEntries, unselectedEntries };
}
