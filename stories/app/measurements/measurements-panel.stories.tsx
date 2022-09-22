import measurements from '../../data/measurements.json';

import { MeasurementsPanel as MeasurementsPanelComponent } from '@/app/components';

export default {
  title: 'Measurements / Panels',
};

export function MeasurementsPanel() {
  return (
    // @ts-expect-error bad types?
    <MeasurementsPanelComponent measurements={measurements.measurements} />
  );
}
