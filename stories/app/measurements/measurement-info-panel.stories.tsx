import measurement from '../../data/irMeasurement.json';

import { MeasurementInfoPanel as MeasurementInfoPanelComponent } from '@/app/components';

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
