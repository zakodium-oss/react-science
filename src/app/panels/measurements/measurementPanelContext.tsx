import { Panel } from '@blueprintjs/core';
import { createContext, type ReactNode, useContext } from 'react';

export interface MeasurementState {
  openPanel?: (panel: Panel<object>) => void;
}

const measurementPanelContext = createContext<MeasurementState>({});

export function useMeasurementPanel() {
  const context = useContext(measurementPanelContext);
  if (!context) {
    throw new Error(
      'useMeasurementPanel must be used within a MeasurementPanel',
    );
  }
  return context;
}

export function MeasurementPanelProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: MeasurementState;
}) {
  return (
    <measurementPanelContext.Provider value={value}>
      {children}
    </measurementPanelContext.Provider>
  );
}
