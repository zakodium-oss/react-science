import { MeasurementInfoPanel as MeasurementInfoPanelComponent } from '../../src';
import measurement from '../data/irMeasurement.json';

export default {
  title: 'Measurements / Panels',
};

export function MeasurementInfoPanel() {
  return (
    <MeasurementInfoPanelComponent
      // @ts-expect-error bad types?
      measurement={measurement}
    />
  );
}
