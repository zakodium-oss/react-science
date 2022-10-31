import IsotopicDistribution from 'isotopic-distribution';
import { xyToXYObject } from 'ml-spectra-processing';
import { getBestPeaks } from 'ms-spectrum';
import { useMemo } from 'react';
import {
  Annotation,
  Annotations,
  Axis,
  BarSeries,
  Heading,
  LineSeries,
  Plot,
  PlotController,
  useAxisWheelZoom,
  useAxisZoom,
  useCrossHair,
  usePan,
  usePlotControllerAxes,
  useRectangularZoom,
} from 'react-plot';

import type { MeasurementBase } from '../data/MeasurementBase';

interface Peak {
  label: string;
  x: number;
  y: number;
  shortLabel: string;
}

type Measurement = Pick<
  MeasurementBase,
  'meta' | 'filename' | 'info' | 'title' | 'data'
>;
export interface MeasurementPlotProps {
  measurement: Measurement;
  dataIndex?: number;
  xVariableName?: string;
  yVariableName?: string;
  width?: number;
  height?: number;
  zoom?: 'horizontal' | 'vertical' | 'rectangular' | '';
  wheelZoom?: 'vertical' | 'horizontal' | '';
  crossHair?: boolean;
  showHorizontalAxis?: boolean;
  showVerticalAxis?: boolean;
  showHorizontalGrid?: boolean;
  showVerticalGrid?: boolean;
  flipHorizontalAxis?: boolean;
  mass?: boolean;
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
    zoom = 'horizontal',
    wheelZoom = 'vertical',
    crossHair = true,
    showHorizontalAxis = true,
    showVerticalAxis = true,
    showHorizontalGrid = true,
    showVerticalGrid = true,
    flipHorizontalAxis = false,
    mass = false,
  } = props;
  const { title = '', data } = measurement;

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

  const direction = ['vertical', 'horizontal'];
  const rectZoom = useRectangularZoom({
    horizontalAxisId: xAxis,
    verticalAxisId: yAxis,
    disabled: zoom !== 'rectangular',
  });
  const axisZoom = useAxisZoom({
    direction: zoom === 'vertical' ? 'vertical' : 'horizontal',
    horizontalAxisId: xAxis,
    verticalAxisId: yAxis,
    disabled: !direction.includes(zoom),
  });
  useAxisWheelZoom({
    direction: wheelZoom === 'vertical' ? 'vertical' : 'horizontal',
    axisId: wheelZoom === 'vertical' ? yAxis : xAxis,
    disabled: !direction.includes(wheelZoom),
  });
  const crossHairAnnot = useCrossHair({
    horizontalAxisId: xAxis,
    verticalAxisId: yAxis,
    disabled: !crossHair,
  });
  usePan({ horizontalAxisId: xAxis, verticalAxisId: yAxis });

  const { x: xDomain } = usePlotControllerAxes();
  const { profile, centroid } = useMemo(() => {
    if (!mass) {
      return {
        profile: [],
        centroid: [],
      };
    }
    const isotopicDistribution = new IsotopicDistribution({
      x: x.data,
      y: y.data,
    });

    const profileXY = isotopicDistribution.getGaussian({
      maxValue: 100,
    });
    return {
      profile: xyToXYObject(profileXY),
      centroid: isotopicDistribution.getTable({
        maxValue: 100,
      }),
    };
  }, [mass, x.data, y.data]);
  const bestPeaks = useMemo(
    () =>
      mass &&
      getBestPeaks(centroid, {
        from: xDomain?.min ?? -Infinity,
        to: xDomain?.max ?? Infinity,
        limit: 5,
        numberSlots: 10,
        threshold: 0.01,
      }),
    [centroid, mass, xDomain?.max, xDomain?.min],
  );
  return (
    <Plot width={width} height={height}>
      <Heading title={title} />
      {!mass && (
        <LineSeries
          data={xyToXYObject({
            x: x.data,
            y: y.data,
          })}
          xAxis={xAxis}
          yAxis={yAxis}
        />
      )}
      {mass && (
        <LineSeries
          data={profile}
          lineStyle={{ stroke: 'green' }}
          xAxis={xAxis}
          yAxis={yAxis}
        />
      )}
      {mass && (
        <BarSeries
          data={centroid}
          xAxis={xAxis}
          yAxis={yAxis}
          lineStyle={{ stroke: 'red' }}
        />
      )}
      <Annotations>
        {mass &&
          bestPeaks.map((peak: Peak, i) => (
            <Annotation.Group key={i} x={peak.x} y={peak.y}>
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
                {peak.shortLabel}
              </Annotation.Text>
              <Annotation.Text
                style={{ fontSize: '13px', fontWeight: '600' }}
                x="2"
                y="-14"
              >
                {peak.x.toFixed(4)}
              </Annotation.Text>
            </Annotation.Group>
          ))}
        {rectZoom.annotations}
        {axisZoom.annotations}
        {crossHairAnnot.annotations}
      </Annotations>
      <Axis
        id={xAxis}
        hidden={!showHorizontalAxis}
        displayPrimaryGridLines={showVerticalGrid}
        flip={flipHorizontalAxis}
        position="bottom"
        label={`${x.label}${x.units ? `(${x.units})` : ''}`}
      />
      <Axis
        id={yAxis}
        hidden={!showVerticalAxis}
        displayPrimaryGridLines={showHorizontalGrid}
        position="left"
        label={`${y.label}${y.units ? `(${y.units})` : ''}`}
        paddingEnd="5%"
        paddingStart="5%"
      />
    </Plot>
  );
}
