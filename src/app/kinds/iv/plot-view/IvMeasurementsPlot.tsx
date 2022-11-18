import { xyToXYObject } from 'ml-spectra-processing';
import { ResponsiveChart } from 'react-d3-utils';
import { Axis, LineSeries, Plot } from 'react-plot';

import {
  ColorConfig,
  IvMeasurement,
  useAppState,
} from '../../../../app-data/index';
import { getColorFromConfig, splitEntries } from '../../../helpers/index';

export default function IvMeasurementsPlot() {
  const appState = useAppState();
  const { unselectedOpacity } = appState.settings.plot;
  const { selectedEntries, unselectedEntries } = splitEntries(appState, 'iv');

  const series: JSX.Element[] = [];
  for (const { measurement, view } of unselectedEntries) {
    series.push(
      getSeries(measurement, view.color, view.visible ? unselectedOpacity : 0),
    );
  }
  for (const { measurement, view } of selectedEntries) {
    series.push(
      getSeries(measurement, view.color, view.visible ? undefined : 0),
    );
  }

  return (
    <ResponsiveChart>
      {({ width, height }) => (
        <Plot width={width} height={height}>
          {series}
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

function getSeries(
  measurement: IvMeasurement,
  colorConfig: ColorConfig,
  opacity?: number,
) {
  const xVariable = measurement.data[0].variables.x;
  const yVariable = measurement.data[0].variables.y;
  const data = xyToXYObject({ x: xVariable.data, y: yVariable.data });
  return (
    <LineSeries
      key={measurement.id}
      data={data}
      lineStyle={{
        opacity,
        stroke: getColorFromConfig(colorConfig),
      }}
    />
  );
}
