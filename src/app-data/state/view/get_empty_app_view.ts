import { type AppView } from './app_view.js';

export function getEmptyAppView(): AppView {
  return {
    selectedMeasurements: {},
    measurements: {},
    plot: {},
  };
}
