import { Meta } from '@storybook/react';

import { Measurement, MeasurementInfoPanel } from '../src';

import data from './data/measurement.json';

export default {
  title: 'Layout/MeasurementInfoPanel',
  component: MeasurementInfoPanel,
} as Meta;

export function control() {
  return <MeasurementInfoPanel measurement={data as Measurement} />;
}
