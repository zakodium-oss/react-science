import { MeasurementInfoPanel as MeasurementInfoPanelComponent } from '../../src';
import data from '../data/measurements.json';

export default {
  title: 'Measurements / Panels',
};

export function MeasurementInfoPanel() {
  return (
    <MeasurementInfoPanelComponent
      // @ts-expect-error bad types?
      measurement={data.measurements.ir.entries[0]}
    />
  );
}
