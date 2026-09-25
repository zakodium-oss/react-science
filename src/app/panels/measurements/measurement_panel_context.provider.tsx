import type { ReactNode } from 'react';

import type { MeasurementState } from './measurement_panel_context.js';
import { MeasurementPanelContext } from './measurement_panel_context.js';

export function MeasurementPanelProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: MeasurementState;
}) {
  return (
    <MeasurementPanelContext value={value}>{children}</MeasurementPanelContext>
  );
}
