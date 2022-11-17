import { SettingsState } from './SettingsState';

export function getEmptySettingsState(): SettingsState {
  return {
    plot: {
      unselectedOpacity: 0.3,
    },
  };
}
