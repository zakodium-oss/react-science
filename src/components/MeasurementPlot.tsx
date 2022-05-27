import { xyToXYObject } from 'ml-spectra-processing';
import React, { useEffect, useMemo } from 'react';
import {
  Axis,
  Heading,
  LineSeries,
  Plot,
  PlotController,
  useAxisWheelZoom,
  useAxisZoom,
  useCrossHair,
  usePan,
  useRectangularZoom,
} from 'react-plot';

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
  zoom?: 'horizontal' | 'vertical' | 'rectangular' | '';
  wheelZoom?: 'vertical' | 'horizontal' | '';
  crossHair?: boolean;
  showHorizontalAxis?: boolean;
  showVerticalAxis?: boolean;
  showHorizontalGrid?: boolean;
  showVerticalGrid?: boolean;
  flipHorizontalAxis?: boolean;
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
  return (
    <PlotController>
      <MeasurementComponent {...props} />
    </PlotController>
  );
}

function MeasurementComponent(props: MeasurementPlotProps) {
  const {
    measurement,
    dataIndex = 0,
    xVariableName = 'x',
    yVariableName = 'y',
    width = 800,
    height = 400,
  } = props;
  const {
    title = '',
    data,
    zoom = 'horizontal',
    wheelZoom = 'vertical',
    crossHair = true,
    showHorizontalAxis = true,
    showVerticalAxis = true,
    showHorizontalGrid = true,
    showVerticalGrid = true,
    flipHorizontalAxis = false,
  } = measurement;
  const {
    variables: { [xVariableName]: x, [yVariableName]: y },
  } = data[dataIndex];
  useAxisZoom({
    direction: zoom,
    axisId: zoom === 'vertical' ? yVariableName : xVariableName,
  });
  useRectangularZoom({
    horizontalAxisId: xVariableName,
    verticalAxisId: yVariableName,
  });
  useAxisWheelZoom({
    direction: wheelZoom,
    axisId: wheelZoom === 'vertical' ? yVariableName : xVariableName,
  });
  useAxisWheelZoom({
    direction: wheelZoom,
    axisId: wheelZoom === 'vertical' ? yVariableName : xVariableName,
  });
  useCrossHair({
    horizontalAxisId: xVariableName,
    verticalAxisId: yVariableName,
  });
  usePan({
    horizontalAxisId: xVariableName,
    verticalAxisId: yVariableName,
  });
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
        id={xVariableName}
        hidden={!showHorizontalAxis}
        displayPrimaryGridLines={showHorizontalGrid}
        flip={flipHorizontalAxis}
        position="bottom"
        label={`${x.label}${x.units ? `(${x.units})` : ''}`}
      />
      <Axis
        id={yVariableName}
        hidden={!showVerticalAxis}
        displayPrimaryGridLines={showVerticalGrid}
        position="left"
        label={`${y.label}${y.units ? `(${y.units})` : ''}`}
      />
    </Plot>
  );
}
