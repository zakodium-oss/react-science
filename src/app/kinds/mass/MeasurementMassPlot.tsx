import { xyToXYObject } from 'ml-spectra-processing';
import { getBestPeaks, Spectrum } from 'ms-spectrum';
import { useMemo } from 'react';
import {
  Annotation,
  Annotations,
  BarSeries,
  LineSeries,
  PlotController,
  usePlotControllerAxes,
} from 'react-plot';

import { BasicComponent, MeasurementPlotProps } from '../../helpers/index';

interface Peak {
  label: string;
  x: number;
  y: number;
  shortLabel: string;
}

export function MeasurementMassPlot(props: MeasurementPlotProps) {
  const { measurement: measurements } = props;
  const measurementsArray = Array.isArray(measurements)
    ? measurements
    : [measurements];
  for (const measurement of measurementsArray) {
    if (!measurement.data) {
      throw new Error(
        'This is weird, the data property is not available on measurement',
      );
    }
    if (measurement.data.length === 0) {
      throw new Error('Data property is empty');
    }
    if (measurement.data.length > 1) {
      throw new Error('Length of data property is larger than 1');
    }
    if (!measurement.data[0].variables.x) {
      throw new Error('x variable in undefined');
    }
    if (!measurement.data[0].variables.y) {
      throw new Error('y variable in undefined');
    }
  }

  return (
    <PlotController>
      <MassComponent {...props} />
    </PlotController>
  );
}

function MassComponent(props: MeasurementPlotProps) {
  const { measurement: measurements } = props;

  const dataXY = useMemo(() => {
    const measurementsArray = Array.isArray(measurements)
      ? measurements
      : [measurements];
    return measurementsArray.map(({ data, id }) => {
      const { variables } = data[0];
      const { x, y } = variables;
      return { x, y, id };
    });
  }, [measurements]);

  const { x: xDomain } = usePlotControllerAxes();
  const { profiles, peaks } = useMemo(() => {
    const profiles = [];
    const peaks = [];
    for (const { x, y, id } of dataXY) {
      const spectrum = new Spectrum({
        x: x.data,
        y: y.data,
      });
      const isContinuous = spectrum.isContinuous();
      const data =
        isContinuous &&
        xyToXYObject({
          x: x.data,
          y: y.data,
        });
      profiles.push({ data, id });
      peaks.push(...spectrum.getPeaks(data));
    }
    return {
      profiles,
      peaks,
    };
  }, [dataXY]);
  const bestPeaks = useMemo(
    () =>
      getBestPeaks(peaks, {
        from: xDomain?.min ?? undefined,
        to: xDomain?.max ?? undefined,
        limit: 10,
        numberSlots: 10,
        threshold: 0.01,
      }),
    [peaks, xDomain?.max, xDomain?.min],
  );
  return (
    <BasicComponent {...props}>
      {profiles.map(
        ({ data, id }) =>
          data && (
            <LineSeries key={id} data={data} lineStyle={{ stroke: 'green' }} />
          ),
      )}
      <BarSeries data={peaks} lineStyle={{ stroke: 'red' }} />
      <Annotations>
        {bestPeaks.map(({ x, y, shortLabel }: Peak) => (
          <Annotation.Group key={x} x={x} y={y}>
            <Annotation.Line
              x1="0"
              x2="0"
              y1="0"
              y2="-5"
              style={{ strokeWidth: 2, stroke: 'blue' }}
            />
            <Annotation.Text
              style={{ fontSize: '0.875rem', fontWeight: '600' }}
              x="2"
              y="0"
            >
              {shortLabel}
            </Annotation.Text>
            <Annotation.Text
              style={{ fontSize: '0.875rem', fontWeight: '600' }}
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
