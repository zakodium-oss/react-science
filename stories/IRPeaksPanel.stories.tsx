import { Meta } from '@storybook/react';
import { useEffect, useState } from 'react';

import { IRPeaksPanel as IRPeaksPanelComponent } from '../src';
import { IRPeak } from '../src/components/context/data/DataState';

export default {
  title: 'Layout/Panels/IRPeaksPanel',
  component: IRPeaksPanelComponent,
} as Meta;

export function IRPeaksPanel() {
  return <IRPeaksPanelStory />;
}

function IRPeaksPanelStory() {
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
  return loaded ? <IRPeaksPanelComponent peaks={peaks} /> : null;
}
