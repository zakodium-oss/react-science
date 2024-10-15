import type { AppData } from './AppData.js';

export function getEmptyAppData(): AppData {
  return {
    measurements: {
      ir: { entries: [] },
      iv: { entries: [] },
      raman: { entries: [] },
      uv: { entries: [] },
      uvvis: { entries: [] },
      gclc: { entries: [] },
      gclcms: { entries: [] },
      nmr: { entries: [] },
      mass: { entries: [] },
      other: { entries: [] },
    },
  };
}
