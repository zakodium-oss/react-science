import { AppView } from './AppView';

export function getEmptyAppView(): AppView {
  return {
    selectedMeasurements: {},
    measurements: {},
    plot: {},
  };
}
