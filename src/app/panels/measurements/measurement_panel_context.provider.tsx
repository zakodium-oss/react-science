import type { ReactNode } from 'react';

import type { MeasurementState } from './measurement_panel_context.js';
import { measurementPanelContext } from './measurement_panel_context.js';

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
