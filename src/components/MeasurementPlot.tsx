import { xyToXYObject } from 'ml-spectra-processing';
import React from 'react';
import {
  Annotations,
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
  const direction = ['vertical', 'horizontal'];
  const rectZoom = useRectangularZoom({
    horizontalAxisId: xVariableName,
    verticalAxisId: yVariableName,
    disabled: zoom !== 'rectangular',
  });
  const axisZoom = useAxisZoom({
    direction: zoom === 'vertical' ? 'vertical' : 'horizontal',
    axisId: zoom === 'vertical' ? yVariableName : xVariableName,
    disabled: !direction.includes(zoom),
  });
  useAxisWheelZoom({
    direction: wheelZoom === 'vertical' ? 'vertical' : 'horizontal',
    axisId: wheelZoom === 'vertical' ? yVariableName : xVariableName,
    disabled: !direction.includes(wheelZoom),
  });
  const crossHairAnnot = useCrossHair({
    horizontalAxisId: xVariableName,
    verticalAxisId: yVariableName,
    disabled: !crossHair,
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
      <Annotations>
        {rectZoom.annotations}
        {axisZoom.annotations}
        {crossHairAnnot.annotations}
      </Annotations>
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
