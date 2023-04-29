import { xyToXYObject } from 'ml-spectra-processing';
// @ts-expect-error ms-spectrum has no types at the moment.
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
    return measurementsArray.map(({ data }) => {
      const { variables } = data[0];
      const { x, y } = variables;
      return { x, y };
    });
  }, [measurements]);

  const { x: xDomain } = usePlotControllerAxes();
  const { profiles, peaks } = useMemo(() => {
    const profiles = [];
    const peaks = [];
    for (const { x, y } of dataXY) {
      const spectrum = new Spectrum({
        x: x.data,
        y: y.data,
      });
      const isContinuous = spectrum.isContinuous();
      const profile =
        isContinuous &&
        xyToXYObject({
          x: x.data,
          y: y.data,
        });
      profiles.push(profile);
      peaks.push(...spectrum.getPeaks(profile));
    }
    return {
      profiles,
      peaks,
    };
  }, [dataXY]);
  const bestPeaks = useMemo(
    () =>
      getBestPeaks(peaks, {
        from: xDomain?.min,
        to: xDomain?.max,
        limit: 10,
        numberSlots: 10,
        threshold: 0.01,
      }),
    [peaks, xDomain?.max, xDomain?.min],
  );
  return (
    <BasicComponent {...props}>
      {profiles.map(
        (profile, i) =>
          profile && (
            <LineSeries
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              data={profile}
              lineStyle={{ stroke: 'green' }}
            />
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
