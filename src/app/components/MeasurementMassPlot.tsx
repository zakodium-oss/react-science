import { xyToXYObject } from 'ml-spectra-processing';
import { getBestPeaks, getPeaks } from 'ms-spectrum';
import { useMemo } from 'react';
import {
  Annotation,
  Annotations,
  BarSeries,
  LineSeries,
  PlotController,
  usePlotControllerAxes,
} from 'react-plot';

import type { MeasurementPlotProps } from './MeasurementPlot';
import { BasicComponent } from './utils';

interface Peak {
  label: string;
  x: number;
  y: number;
  shortLabel: string;
}

export function MeasurementMassPlot(props: MeasurementPlotProps) {
  return (
    <PlotController>
      <MassComponent {...props} />
    </PlotController>
  );
}

function MassComponent(props: MeasurementPlotProps) {
  const {
    measurement,
    dataIndex = 0,
    xVariableName = 'x',
    yVariableName = 'y',
  } = props;
  const { data } = measurement;
  const xAxis = `${xVariableName}-x`;
  const yAxis = `${yVariableName}-y`;
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

  const { x: xDomain } = usePlotControllerAxes();
  const { profile, peaks } = useMemo(() => {
    const profile = xyToXYObject({
      x: x.data,
      y: y.data,
    });
    return {
      profile,
      peaks: getPeaks(profile),
    };
  }, [x.data, y.data]);
  const bestPeaks = useMemo(
    () =>
      getBestPeaks(peaks, {
        from: xDomain?.min ?? Number.NEGATIVE_INFINITY,
        to: xDomain?.max ?? Number.POSITIVE_INFINITY,
        limit: 5,
        numberSlots: 10,
        threshold: 0.01,
      }),
    [peaks, xDomain?.max, xDomain?.min],
  );
  return (
    <BasicComponent {...props}>
      <LineSeries
        data={profile}
        lineStyle={{ stroke: 'green' }}
        xAxis={xAxis}
        yAxis={yAxis}
      />

      <BarSeries
        data={peaks}
        xAxis={xAxis}
        yAxis={yAxis}
        lineStyle={{ stroke: 'red' }}
      />
      <Annotations>
        {bestPeaks.map(({ x, y, shortLabel }: Peak) => (
          <Annotation.Group
            key={x}
            x={x}
            y={y}
            horizontalAlign="none"
            verticalAlign="none"
          >
            <Annotation.Line
              x1="0"
              x2="0"
              y1="0"
              y2="-5"
              style={{ strokeWidth: 2, stroke: 'blue' }}
            />
            <Annotation.Text
              style={{ fontSize: '13px', fontWeight: '600' }}
              x="2"
              y="0"
            >
              {shortLabel}
            </Annotation.Text>
            <Annotation.Text
              style={{ fontSize: '13px', fontWeight: '600' }}
              x="2"
              y="-14"
            >
              {x.toFixed(4)}
            </Annotation.Text>
          </Annotation.Group>
        ))}
      </Annotations>
    </BasicComponent>
  );
}
