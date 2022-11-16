import { ViewState } from './ViewState';

export function getEmptyViewState(): ViewState {
  return {
    selectedMeasurements: {},
    measurements: {},
  };
}
