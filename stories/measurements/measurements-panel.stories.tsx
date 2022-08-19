import { MeasurementsPanel as MeasurementsPanelComponent } from '../../src';
import measurements from '../data/measurements.json';

export default {
  title: 'Measurements / Panels',
};

export function MeasurementsPanel() {
  return (
    <MeasurementsPanelComponent measurements={measurements.measurements} />
  );
}
