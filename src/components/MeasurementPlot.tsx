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
  measurement: Measurement;
  dataIndex?: number;
  xVariableName?: string;
  yVariableName?: string;
  width?: number;
  height?: number;
}
export function MeasurementPlot(props: MeasurementPlotProps) {
  const {
    measurement,
    dataIndex = 0,
    xVariableName = 'x',
    yVariableName = 'y',
    width = 800,
    height = 400,
  } = props;
  const { title = '', data } = measurement;
  const {
    variables: { [xVariableName]: x, [yVariableName]: y },
  } = data[dataIndex];
  return (
    <Plot width={width} height={height}>
      <Heading title={title} />
      <LineSeries
        data={xyToXYObject({
          x: x.data,
          y: y.data,
        })}
      />
      <Axis
        key="2"
        position="bottom"
        label={`${x.label}${x.units ? `(${x.units})` : ''}`}
      />
      <Axis
        key="3"
        position="left"
        label={`${y.label}${y.units ? `(${y.units})` : ''}`}
      />
    </Plot>
  );
}
