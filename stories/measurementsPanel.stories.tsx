import { Meta } from '@storybook/react';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import {
  MeasurementsPanel as MeasurementsPanelComponent,
  MeasurementsPanelProps,
} from '../src';
import { DataState } from '../src/components/context/data/DataState';

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

const queryClient = new QueryClient();
export function MeasurementsPanel(props: MeasurementsPanelProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MeasurementsPanelStory {...props} />
    </QueryClientProvider>
  );
}

function MeasurementsPanelStory(props: MeasurementsPanelProps) {
  const { isLoading, data } = useQuery(['repoData'], () =>
    axios
      .get<DataState>('/measurements.json')
      .then(({ data }) => data),
  );

  return isLoading || !data ? (
    <div>Loading...</div>
  ) : (
    <MeasurementsPanelComponent {...data} {...props} />
  );
}
