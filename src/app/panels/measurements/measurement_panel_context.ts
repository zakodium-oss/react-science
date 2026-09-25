import type { Panel } from '@blueprintjs/core';
import { createContext, use } from 'react';

export interface MeasurementState {
  openPanel?: (panel: Panel<object>) => void;
}

export const MeasurementPanelContext = createContext<MeasurementState>({});

export function useMeasurementPanel() {
  const context = use(MeasurementPanelContext);
  if (!context) {
    throw new Error(
      'useMeasurementPanel must be used within a MeasurementPanel',
    );
  }
  return context;
}
