import { xyToXYObject } from 'ml-spectra-processing';
import { useMemo } from 'react';
import { LineSeries, PlotController } from 'react-plot';

import type {
  MeasurementAppView,
  MeasurementBase,
} from '../../app-data/index.js';

import { BasicComponent } from './index.js';

type Measurement = Pick<MeasurementBase, 'meta' | 'info' | 'data' | 'id'>;
export interface MeasurementPlotProps {
  measurement: Measurement[] | Measurement;
  measurementDisplay: MeasurementAppView[] | MeasurementAppView;
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
    measurement,
    dataIndex = 0,
    xVariableName = 'x',
    yVariableName = 'y',
  } = props;

  const dataXY = useMemo(() => {
    const measurementsArray = Array.isArray(measurement)
      ? measurement
      : [measurement];
    return measurementsArray.map(({ data, id }) => {
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
      return { x, y, id };
    });
  }, [dataIndex, measurement, xVariableName, yVariableName]);

  return (
    <BasicComponent {...props}>
      {dataXY.map(({ x, y, id }, i) => {
        const { color } = Array.isArray(measurementDisplay)
          ? measurementDisplay[i]
          : measurementDisplay;
        if (color.kind !== 'fixed') {
          throw new Error(`unimplemented stroke for kind ${color.kind}`);
        }

        return (
          <LineSeries
            key={id}
            lineStyle={{
              stroke: color.color,
            }}
            data={xyToXYObject({
              x: x.data,
              y: y.data,
            })}
          />
        );
      })}
    </BasicComponent>
  );
}
