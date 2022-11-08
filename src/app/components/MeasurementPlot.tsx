import { xyToXYObject } from 'ml-spectra-processing';
import { useMemo } from 'react';
import { LineSeries, PlotController } from 'react-plot';

import type { MeasurementBase } from '../../app-data/index';

import { BasicComponent } from './utils';

type Measurement = Pick<
  MeasurementBase,
  'meta' | 'filename' | 'info' | 'title' | 'data'
>;
export interface MeasurementPlotProps {
  measurement: Measurement;
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

  return (
    <BasicComponent {...props}>
      <LineSeries
        data={xyToXYObject({
          x: x.data,
          y: y.data,
        })}
      />
    </BasicComponent>
  );
}
