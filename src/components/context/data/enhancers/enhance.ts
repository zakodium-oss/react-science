import { DataState } from '../DataState';

export function enhance(dataState: DataState, enhancers = {}) {
  const measurements = dataState.measurements;
  for (let key in measurements) {
    if (
      enhancers[key] &&
      enhancers[key].length > 0 &&
      measurements[key].entries.length > 0
    ) {
      for (const measurement of measurements[key].entries) {
        for (const enhancer of enhancers[key]) {
          enhancer(measurement);
        }
      }
    }
  }
}
