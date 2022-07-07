import { Meta } from '@storybook/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import {
  MeasurementsPanel as MeasurementsPanelComponent,
  MeasurementsPanelProps,
} from '../src';
import { DataState } from '../src/components/context/data/DataState';
import { getEmptyDataState } from '../src/components/context/data/getEmptyDataState';

export default {
  title: 'Layout/Panels/MeasurementsPanel',
  component: MeasurementsPanelComponent,
  argTypes: {
    onTabSelect: {
      action: 'Tab changed',
    },
    onMeasurementSelect: {
      action: 'Measurement selected',
    },
    measurements: {
      control: false,
    },
  },
} as Meta;

export function MeasurementsPanel(props: MeasurementsPanelProps) {
  return <MeasurementsPanelStory {...props} />;
}

function MeasurementsPanelStory(props: MeasurementsPanelProps) {
  const [{ loaded, dataState }, setData] = useState<{
    dataState: DataState;
    loaded: boolean;
  }>({ dataState: getEmptyDataState(), loaded: false });

  useEffect(() => {
    void axios.get<DataState>('/measurements.json').then(({ data }) => {
      setData({ dataState: data, loaded: true });
    });
  }, []);
  return loaded ? (
    <MeasurementsPanelComponent {...dataState} {...props} />
  ) : null;
}
