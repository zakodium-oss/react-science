import { extent } from 'd3-array';
import { scaleLinear, NumberValue } from 'd3-scale';
import React, { ReactNode } from 'react';

import { PlotContext, splitChildren } from '../hooks/plotXY';

export interface Data {
  name: number;
  value: number;
}
export interface Margins {
  top?: 20;
  right?: 20;
  bottom?: 50;
  left?: 50;
}
interface PlotProps {
  dataArray?: Data[][];
  children?: ReactNode;
  width: number;
  height: number;
  margins?: Margins;
  ticks?: number;
}

export default function PlotXY(props: PlotProps) {
  const {
    dataArray = [],
    children,
    width,
    height,
    margins = { top: 0, left: 0, right: 0, bottom: 0 },
    ticks = 5,
  } = props;
  let concatData: Data[] = [];
  const data = concatData.concat(...dataArray);
  const { top = 0, left = 0, right = 0, bottom = 0 } = margins;
  //const parentWidth = width + left + right;
  //const parentHeight = height + top + bottom;
  const { lineSeries, axes } = splitChildren(children);

  const xScale = scaleLinear<number>()
    .domain(extent<Data, number>(data, (d) => d.name) as Iterable<NumberValue>)
    .rangeRound([0, width]);

  const yScale = scaleLinear<number>()
    .domain(extent<Data, number>(data, (d) => d.value) as Iterable<NumberValue>)
    .range([height, 0])
    .nice();

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
