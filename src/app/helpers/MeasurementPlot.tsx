import { xyToXYObject } from 'ml-spectra-processing';
import { useMemo } from 'react';
import { LineSeries, PlotController } from 'react-plot';

import type { MeasurementBase, MeasurementAppView } from '../../app-data/index';

import { BasicComponent } from './index';

type Measurement = Pick<MeasurementBase, 'meta' | 'info' | 'data'>;
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
    const dataXY = [];
    const measurementsArray = Array.isArray(measurement)
      ? measurement
      : [measurement];
    for (const { data } of measurementsArray) {
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
      dataXY.push({ x, y });
    }
    return dataXY;
  }, [dataIndex, measurement, xVariableName, yVariableName]);

  return (
    <BasicComponent {...props}>
      {dataXY.map(({ x, y }, i) => {
        const { color } = Array.isArray(measurementDisplay)
          ? measurementDisplay[i]
          : measurementDisplay;
        if (color.kind !== 'fixed') {
          throw new Error(`unimplemented stroke for kind ${color.kind}`);
        }

        return (
          <LineSeries
            // eslint-disable-next-line react/no-array-index-key
            key={i}
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
