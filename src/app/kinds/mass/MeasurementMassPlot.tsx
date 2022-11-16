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

import { BasicComponent } from '../../helpers/index';
import type { MeasurementPlotProps } from '../../index';

interface Peak {
  label: string;
  x: number;
  y: number;
  shortLabel: string;
}

export function MeasurementMassPlot(props: MeasurementPlotProps) {
  const { measurement } = props;
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

  return (
    <PlotController>
      <MassComponent {...props} />
    </PlotController>
  );
}

function MassComponent(props: MeasurementPlotProps) {
  const { measurement } = props;

  const { data } = measurement;
  const { variables } = data[0];

  const { x, y } = useMemo(() => {
    return { x: variables.x, y: variables.y };
  }, [variables]);

  const { x: xDomain } = usePlotControllerAxes();
  const { profile, peaks } = useMemo(() => {
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
    return {
      profile,
      peaks: spectrum.getPeaks(profile),
    };
  }, [x.data, y.data]);
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
      {profile && <LineSeries data={profile} lineStyle={{ stroke: 'green' }} />}
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
