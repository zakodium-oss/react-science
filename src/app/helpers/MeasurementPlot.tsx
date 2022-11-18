import { xyToXYObject } from 'ml-spectra-processing';
import { useMemo } from 'react';
import { LineSeries, PlotController } from 'react-plot';

import type { MeasurementBase, MeasurementAppView } from '../../app-data/index';

import { BasicComponent } from './index';

type Measurement = Pick<MeasurementBase, 'meta' | 'info' | 'data'>;
export interface MeasurementPlotProps {
  measurement: Measurement;
  measurementDisplay: MeasurementAppView;
  dataIndex?: number;
  xVariableName?: string;
  yVariableName?: string;
  width?: number | `${number}%`;
  height?: number | `${number}%`;
  zoom?: 'horizontal' | 'vertical' | 'rectangular' | '';
  wheelZoom?: 'vertical' | 'horizontal' | '';
  crossHair?: boolean;
  showHorizontalAxis?: boolean;
  showVerticalAxis?: boolean;
  showHorizontalGrid?: boolean;
  showVerticalGrid?: boolean;
  flipHorizontalAxis?: boolean;
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
    measurementDisplay,
    measurement: { data },
    dataIndex = 0,
    xVariableName = 'x',
    yVariableName = 'y',
  } = props;

  const { x, y } = useMemo(() => {
    const { variables } = data[dataIndex];
    const { [xVariableName]: x, [yVariableName]: y } = variables;
    if (x === undefined || y === undefined) {
      throw new Error(
        `Variable "${
          x === undefined ? xVariableName : yVariableName
        }" is not available in data. Only ${Object.keys(
          data[dataIndex].variables,
        ).join(', ')} are available`,
      );
    }

    return { x, y };
  }, [data, dataIndex, xVariableName, yVariableName]);

  const { color } = measurementDisplay;
  if (color.kind !== 'fixed') {
    throw new Error(`unimplemented stroke for kind ${color.kind}`);
  }

  return (
    <BasicComponent {...props}>
      <LineSeries
        lineStyle={{
          stroke: color.color,
        }}
        data={xyToXYObject({
          x: x.data,
          y: y.data,
        })}
      />
    </BasicComponent>
  );
}
