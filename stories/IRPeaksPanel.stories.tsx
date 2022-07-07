import { Meta } from '@storybook/react';
import { useEffect, useState } from 'react';

import {
  IRPeaksPanel as IRPeaksPanelComponent,
  IRPeaksPanelProps,
} from '../src';
import { IRPeak } from '../src/components/context/data/DataState';

export default {
  title: 'Layout/Panels/IRPeaksPanel',
  component: IRPeaksPanelComponent,
  args: {
    preferences: {
      wavenumber: { format: (x: number) => x, display: true },
      transmittance: { format: (x: number) => x, display: true },
      absorbance: { format: (x: number) => x, display: true },
      kind: { format: (x: string) => x, display: true },
    },
  },
} as Meta;

export function IRPeaksPanel(props: Omit<IRPeaksPanelProps, 'peaks'>) {
  return <IRPeaksPanelStory {...props} />;
}

function IRPeaksPanelStory(props: Omit<IRPeaksPanelProps, 'peaks'>) {
  const [{ loaded, peaks }, setData] = useState<{
    peaks: IRPeak[];
    loaded: boolean;
  }>({ peaks: [], loaded: false });

  useEffect(() => {
    fetch('/measurements.json')
      .then((response) => {
        response
          .json()
          .then(
            ({
              measurements: {
                ir: { entries },
              },
            }) => {
              setData({ peaks: entries[0].peaks, loaded: true });
            },
          )
          .catch((e) => {
            throw Error(e);
          });
      })
      .catch((e) => {
        throw Error(e);
      });
  }, []);
  return loaded ? <IRPeaksPanelComponent peaks={peaks} {...props} /> : null;
}
