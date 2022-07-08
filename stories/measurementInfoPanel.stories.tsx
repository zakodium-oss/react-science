import { Meta } from '@storybook/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import {
  MeasurementInfoPanel as MeasurementInfoPanelComponent,
  MeasurementInfoPanelProps,
} from '../src';
import { DataState } from '../src/components/context/data/DataState';

import { QueryDecorator } from './utils';

export default {
  title: 'Layout/Panels/MeasurementInfoPanel',
  component: MeasurementInfoPanelComponent,
  decorators: [QueryDecorator],
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
  const { isLoading, data } = useQuery(['repoData'], () =>
    axios.get<DataState>('../measurements.json').then(({ data }) => data),
  );

  return isLoading || !data ? (
    <div>Loading...</div>
  ) : (
    <MeasurementInfoPanelComponent
      measurement={data.measurements.ir.entries[0]}
      {...props}
    />
  );
}
