import { useState } from 'react';

import type { MeasurementKind } from '../../../src/app-data/index';
import { MeasurementsPanel as MeasurementsPanelComponent } from '../../../src/app/index';
import measurements from '../../data/measurements.json';

export default {
  title: 'Measurements / Panels',
};

export function MeasurementsPanel() {
  const [measurement, setMeasurement] = useState<
    | {
        kind: MeasurementKind;
        id?: string;
      }
    | undefined
  >(undefined);
  return (
    <MeasurementsPanelComponent
      // @ts-expect-error bad types?
      measurements={measurements.measurements}
      selectedMeasurement={measurement}
      onTabSelect={(kind) => {
        setMeasurement({ kind });
      }}
      onMeasurementSelect={({ kind, measurement }) => {
        setMeasurement({ id: measurement.id, kind });
      }}
    />
  );
}
