import { AppState } from './AppState';

export function getEmptyAppState(): AppState {
  return {
    measurements: {
      selected: undefined,
      kind: undefined,
    },
  };
}
