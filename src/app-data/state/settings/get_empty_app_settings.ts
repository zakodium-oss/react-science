import { type AppSettings } from './app_settings.js';

export function getEmptyAppSettings(): AppSettings {
  return {
    plot: {
      unselectedOpacity: 0.3,
    },
  };
}
