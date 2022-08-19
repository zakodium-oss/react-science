import { MeasurementsPanel as MeasurementsPanelComponent } from '../../src';
import measurements from '../data/measurements.json';

export default {
  title: 'Measurements / Panels',
};

export function MeasurementsPanel() {
  return (
    // @ts-expect-error bad types?
    <MeasurementsPanelComponent measurements={measurements.measurements} />
  );
}
