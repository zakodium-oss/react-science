import { xyToXYObject } from 'ml-spectra-processing';
import React from 'react';
import { Axis, Heading, LineSeries, Plot } from 'react-plot';

interface Variable {
  label: string;
  data: number[];
  units?: string;
  symbol?: string;
}
interface Data {
  variables: Record<string, Variable>;
}
interface Measurement {
  meta?: object;
  filename?: string;
  info?: object;
  title?: string;
  data: Data[];
}
export interface MeasurementPlotProps {
  measurment: Measurement;
  dataIndex?: number;
  xVariableName?: string;
  yVariableName?: string;
  width?: number;
  height?: number;
}
export function MeasurementPlot(props: MeasurementPlotProps) {
  const {
    measurment,
    dataIndex = 0,
    xVariableName = 'x',
    yVariableName = 'y',
    width = 800,
    height = 400,
  } = props;
  const { title = '', data } = measurment;
  return (
    <Plot width={width} height={height}>
      <Heading title={title} />
      {data.map(
        ({ variables: { [xVariableName]: x, [yVariableName]: y } }, i) => [
          <LineSeries
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            data={xyToXYObject({
              x: x.data.splice(dataIndex),
              y: y.data.splice(dataIndex),
            })}
          />,
          <Axis
            key="2"
            position="bottom"
            label={`${x.label}${x.units ? `(${x.units})` : ''}`}
          />,
          <Axis
            key="3"
            position="left"
            label={`${y?.label}${y.units ? `(${y.units})` : ''}`}
          />,
        ],
      )}
    </Plot>
  );
}
