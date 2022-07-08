import { Meta } from '@storybook/react';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import {
  MeasurementInfoPanel as MeasurementInfoPanelComponent,
  MeasurementInfoPanelProps,
} from '../src';
import { DataState } from '../src/components/context/data/DataState';

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

const queryClient = new QueryClient();
export function MeasurementInfoPanel(
  props: Omit<MeasurementInfoPanelProps, 'measurement'>,
) {
  return (
    <QueryClientProvider client={queryClient}>
      <MeasurementInfoPanelControl {...props} />
    </QueryClientProvider>
  );
}

function MeasurementInfoPanelControl(
  props: Omit<MeasurementInfoPanelProps, 'measurement'>,
) {
  const { isLoading, data } = useQuery(['repoData'], () =>
    axios
      .get<DataState>('../measurements.json')
      .then(({ data }) => data.measurements.ir.entries[0]),
  );

  return isLoading || !data ? (
    <div>Loading...</div>
  ) : (
    <MeasurementInfoPanelComponent measurement={data} {...props} />
  );
}
