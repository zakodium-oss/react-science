import { Meta } from '@storybook/react';
import { useEffect, useState } from 'react';

import { MeasurementsPanel } from '../src';
import { DataState } from '../src/components/context/data/DataState';
import { getEmptyDataState } from '../src/components/context/data/getEmptyDataState';

export default {
  title: 'Layout/MeasurementsPanel',
  component: MeasurementsPanel,
} as Meta;

export function control() {
  return <MeasurementsPanelStory />;
}

function MeasurementsPanelStory() {
  const [{ loaded, dataState }, setData] = useState<{
    dataState: DataState;
    loaded: boolean;
  }>({ dataState: getEmptyDataState(), loaded: false });

  useEffect(() => {
    fetch('/measurements.json')
      .then((response) => {
        response
          .json()
          .then((dataState) => {
            setData({ dataState, loaded: true });
          })
          .catch((e) => {
            throw Error(e);
          });
      })
      .catch((e) => {
        throw Error(e);
      });
  }, []);
  return loaded ? <MeasurementsPanel {...dataState} /> : null;
}
