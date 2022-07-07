import { Meta } from '@storybook/react';
import axios from 'axios';
import { useState, useEffect } from 'react';

import {
  MeasurementInfoPanel as MeasurementInfoPanelComponent,
  MeasurementInfoPanelProps,
} from '../src';
import {
  DataState,
  MeasurementBase,
} from '../src/components/context/data/DataState';

export default {
  title: 'Layout/Panels/MeasurementInfoPanel',
  component: MeasurementInfoPanelComponent,
  args: {
    metaStyle: {
      backgroundColor: 'red',
      padding: '0px 6px',
    },
    infoStyle: {
      backgroundColor: 'green',
      padding: '0px 6px',
    },
  },
} as Meta<Omit<MeasurementInfoPanelProps, 'measurement'>>;
export function MeasurementInfoPanel(
  props: Omit<MeasurementInfoPanelProps, 'measurement'>,
) {
  return <MeasurementInfoPanelControl {...props} />;
}
function MeasurementInfoPanelControl(
  props: Omit<MeasurementInfoPanelProps, 'measurement'>,
) {
  const [{ loaded, measurement }, setData] = useState<{
    measurement: MeasurementBase;
    loaded: boolean;
  }>({ measurement: { id: '', meta: {}, info: {}, data: [] }, loaded: false });

  useEffect(() => {
    void axios.get<DataState>('/measurements.json').then(({ data }) => {
      const measurement = data.measurements.ir.entries[0];
      setData({ measurement, loaded: true });
    });
  }, []);
  return loaded ? (
    <MeasurementInfoPanelComponent measurement={measurement} {...props} />
  ) : null;
}
