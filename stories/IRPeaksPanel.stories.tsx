import { Meta } from '@storybook/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import { IRPeaksPanel as IRPeaksPanelComponent } from '../src';
import { DataState } from '../src/components/context/data/DataState';

import { QueryDecorator } from './utils';

export default {
  title: 'Layout/Panels/IRPeaksPanel',
  component: IRPeaksPanelComponent,
  decorators: [QueryDecorator],
} as Meta;

export function IRPeaksPanel() {
  return <IRPeaksPanelStory />;
}

function IRPeaksPanelStory() {
  const { isLoading, data } = useQuery(['repoData'], () =>
    axios.get<DataState>('../measurements.json').then(({ data }) => data),
  );

  return isLoading || !data || !data.measurements.ir.entries[0].peaks ? (
    <div>Loading...</div>
  ) : (
    <IRPeaksPanelComponent peaks={data.measurements.ir.entries[0].peaks} />
  );
}
