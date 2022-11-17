import { AppSettings } from './AppSettings';

export function getEmptyAppSettings(): AppSettings {
  return {
    plot: {
      unselectedOpacity: 0.3,
    },
  };
}
