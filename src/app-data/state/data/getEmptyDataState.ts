import type { DataState } from './DataState';

export function getEmptyDataState(): DataState {
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
