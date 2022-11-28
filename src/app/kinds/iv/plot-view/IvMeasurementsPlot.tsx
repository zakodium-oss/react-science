import { ResponsiveChart } from 'react-d3-utils';
import { Annotations, Axis, Plot, Series, useCrossHair } from 'react-plot';

import { useAppState } from '../../../../app-data/index';
import { splitEntries } from '../../../helpers/index';

import IvSeries from './IvSeries';

export default function IvMeasurementsPlot() {
  const appState = useAppState();
  const crossHair = useCrossHair();
  const { unselectedOpacity } = appState.settings.plot;
  const { selectedEntries, unselectedEntries } = splitEntries(appState, 'iv');

  const series: JSX.Element[] = [];
  for (const { measurement, view } of unselectedEntries) {
    series.push(
      <IvSeries
        measurement={measurement}
        colorConfig={view.color}
        opacity={view.visible ? unselectedOpacity : 0}
      />,
    );
  }
  for (const { measurement, view } of selectedEntries) {
    series.push(
      <IvSeries
        measurement={measurement}
        colorConfig={view.color}
        opacity={view.visible ? undefined : 0}
      />,
    );
  }

  return (
    <ResponsiveChart>
      {({ width, height }) => (
        <Plot width={width} height={height}>
          <Series>{series}</Series>
          <Annotations>{crossHair.annotations}</Annotations>
          <Axis displayPrimaryGridLines position="bottom" label="X" />
          <Axis
            displayPrimaryGridLines
            position="left"
            paddingStart="10"
            paddingEnd="10"
          />
        </Plot>
      )}
    </ResponsiveChart>
  );
}
