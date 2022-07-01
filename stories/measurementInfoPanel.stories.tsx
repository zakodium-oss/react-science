import { Meta } from '@storybook/react';
import { useState, useEffect } from 'react';

import { MeasurementInfoPanel } from '../src';
import { MeasurementBase } from '../src/components/context/data/DataState';

export default {
  title: 'Layout/MeasurementInfoPanel',
  component: MeasurementInfoPanel,
} as Meta;
export function control() {
  return <MeasurementInfoPanelControl />;
}
function MeasurementInfoPanelControl() {
  const [{ loaded, measurement }, setData] = useState<{
    measurement: MeasurementBase;
    loaded: boolean;
  }>({ measurement: { id: '', meta: {}, info: {}, data: [] }, loaded: false });

  useEffect(() => {
    fetch('/measurements.json')
      .then((response) => {
        response
          .json()
          .then((dataState) => {
            const measurement = dataState.measurements.ir.entries[0];
            setData({ measurement, loaded: true });
          })
          .catch((e) => {
            throw Error(e);
          });
      })
      .catch((e) => {
        throw Error(e);
      });
  }, []);
  return loaded ? <MeasurementInfoPanel measurement={measurement} /> : null;
}
