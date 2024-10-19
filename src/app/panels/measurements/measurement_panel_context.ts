import { type Panel } from '@blueprintjs/core';
import { createContext, useContext } from 'react';

export interface MeasurementState {
  openPanel?: (panel: Panel<object>) => void;
}

export const measurementPanelContext = createContext<MeasurementState>({});

export function useMeasurementPanel() {
  const context = useContext(measurementPanelContext);
  if (!context) {
    throw new Error(
      'useMeasurementPanel must be used within a MeasurementPanel',
    );
  }
  return context;
}
