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
};

export function MeasurementsPanel(props: MeasurementsPanelProps) {
  return <MeasurementsPanelStory {...props} />;
}

function MeasurementsPanelStory(props: MeasurementsPanelProps) {
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
  return loaded ? (
    <MeasurementsPanelComponent {...dataState} {...props} />
  ) : null;
}
