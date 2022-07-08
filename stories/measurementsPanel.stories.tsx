import { Meta } from '@storybook/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import {
  MeasurementsPanel as MeasurementsPanelComponent,
  MeasurementsPanelProps,
} from '../src';
import { DataState } from '../src/components/context/data/DataState';

import { QueryDecorator } from './utils';

export default {
  title: 'Layout/Panels/MeasurementsPanel',
  component: MeasurementsPanelComponent,
  decorators: [QueryDecorator],
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
  const { isLoading, data } = useQuery(['repoData'], () =>
    axios.get<DataState>('../measurements.json').then(({ data }) => data),
  );

  return isLoading || !data ? (
    <div>Loading...</div>
  ) : (
    <MeasurementsPanelComponent {...data} {...props} />
  );
}
