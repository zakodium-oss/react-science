import { extent } from 'd3-array';
import { scaleLinear, NumberValue } from 'd3-scale';
import React, { ReactNode } from 'react';

import { PlotContext, splitChildren } from '../hooks/plotXY';

import LineSerie from './components/LineSerie';
import XYAxis from './components/axis/xy-axis';

export interface Data {
  x: number;
  y: number;
}
export interface Margins {
  top?: 20;
  right?: 20;
  bottom?: 50;
  left?: 50;
}
export interface DataJSON {
  x: {
    label: string;
    symbol: string;
    data: number[];
    min: number;
    max: number;
    isMonotone: boolean;
  };
  y: {
    label: string;
    symbol: string;
    data: number[];
    min: number;
    max: number;
    isMonotone: boolean;
  };
}
interface MinMax {
  x: { min: number; max: number };
  y: { min: number; max: number };
}
interface PlotProps {
  dataArray?: { color: string; data: Data[] }[];
  children?: ReactNode;
  width: number;
  height: number;
  margins?: Margins;
  ticks?: { x: number; y: number };
  minMax?: MinMax;
}

export default function PlotXY(props: PlotProps) {
  const {
    minMax,
    dataArray,
    children,
    width,
    height,
    margins = { top: 0, left: 0, right: 0, bottom: 0 },
    ticks = { x: 5, y: 5 },
  } = props;

  const { top = 0, left = 0, right = 0, bottom = 0 } = margins;

  const { lineSeries, axes } = splitChildren(children);
  let xScale = scaleLinear<number>();
  let yScale = scaleLinear<number>();

  if (minMax) {
    xScale = scaleLinear<number>()
      .domain([minMax.x.min, minMax.x.max])
      .rangeRound([0, width]);
    yScale = scaleLinear<number>()
      .domain([minMax.y.min, minMax.y.max])
      .range([height, 0])
      .nice();
  } else if (dataArray) {
    const concatData: Data[] = [];
    const data = concatData.concat(...dataArray.map((line) => line.data));
    xScale = scaleLinear<number>()
      .domain(extent<Data, number>(data, (d) => d.x) as Iterable<NumberValue>)
      .rangeRound([0, width]);
    yScale = scaleLinear<number>()
      .domain(extent<Data, number>(data, (d) => d.y) as Iterable<NumberValue>)
      .range([height, 0])
      .nice();
  } else {
    throw Error('Data needed');
  }

  return (
    <PlotContext.Provider
      value={{
        width,
        height,
        top,
        right,
        left,
        bottom,
        xScale,
        yScale,
        ticks,
      }}
    >
      <svg
        className="lineChartSvg"
        width={width + left + right}
        height={height + top + bottom}
      >
        <g transform={`translate(${left}, ${top})`}>
          {axes}
          {lineSeries}
        </g>
      </svg>
    </PlotContext.Provider>
  );
}
interface JsonPlotXYPorps {
  data: DataJSON;
  margins?: Margins;
  width: number;
  height: number;
  ticks?: { x: number; y: number };
  color: string;
}

export function JsonPlotXY(props: JsonPlotXYPorps) {
  const { data, margins, ticks = { x: 5, y: 5 }, height, width, color } = props;

  const minMax = {
    x: { min: data.x.min, max: data.x.max },
    y: { min: data.y.min, max: data.y.max },
  };
  const dataOff: Data[] = [];
  data.x.data.forEach((x, key) => {
    dataOff.push({ x: x, y: data.y.data[key] });
  });
  return (
    <PlotXY
      minMax={minMax}
      margins={margins}
      width={width}
      height={height}
      ticks={ticks}
    >
      <XYAxis xLabel={data.x.label} yLabel={data.y.label} />
      <LineSerie data={dataOff} color={color} />
    </PlotXY>
  );
}
