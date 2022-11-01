import { useState } from 'react';

import measurements from '../../data/measurements.json';

import { MeasurementsPanel as MeasurementsPanelComponent } from '@/app/components';
import type { MeasurementKind } from '@/app/data/DataState';

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
