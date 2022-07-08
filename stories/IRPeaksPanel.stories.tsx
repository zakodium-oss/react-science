import { Meta } from '@storybook/react';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import { IRPeaksPanel as IRPeaksPanelComponent } from '../src';
import { DataState } from '../src/components/context/data/DataState';

export default {
  title: 'Layout/Panels/IRPeaksPanel',
  component: IRPeaksPanelComponent,
} as Meta;

const queryClient = new QueryClient();
export function IRPeaksPanel() {
  return (
    <QueryClientProvider client={queryClient}>
      <IRPeaksPanelStory />
    </QueryClientProvider>
  );
}

function IRPeaksPanelStory() {
  const { isLoading, data } = useQuery(['repoData'], () =>
    axios
      .get<DataState>('/measurements.json')
      .then(({ data }) => data.measurements.ir.entries[0].peaks),
  );

  return isLoading || !data ? (
    <div>Loading...</div>
  ) : (
    <IRPeaksPanelComponent peaks={data} />
  );
}
