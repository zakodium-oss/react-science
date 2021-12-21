import { ComponentStory, Meta } from '@storybook/react';
import React from 'react';

import data from '../src/data/variables.json';
import PlotXY, {
  Data,
  DataJSON,
  Margins,
  JsonPlotXY,
} from '../src/layout/PlotXY';
import LineSerie from '../src/layout/PlotXY/components/LineSerie';
import XYAxis from '../src/layout/PlotXY/components/axis/xy-axis';

export default {
  title: 'Layout/PlotXY',
  component: PlotXY,
  args: {},
} as Meta;
interface PlotMultiLinesStoryProps {
  dataArray: { color: string; data: Data[] }[];
  margins?: Margins;
  height: number;
  width: number;
  ticks?: { x: number; y: number };
  xLabel?: string;
  yLabel?: string;
}
const MultiLinesStory: ComponentStory<
  (props: PlotMultiLinesStoryProps) => JSX.Element
> = (props: PlotMultiLinesStoryProps) => {
  const {
    dataArray = [],
    margins,
    height,
    width,
    ticks,
    xLabel = 'x',
    yLabel = 'y',
  } = props;
  return (
    <PlotXY
      dataArray={dataArray}
      margins={margins}
      width={width}
      height={height}
      ticks={ticks}
    >
      <XYAxis
        xLabel={xLabel}
        yLabel={yLabel}
        labelStyle={{ fontSize: '18px' }}
      />
      {dataArray.map((line) => {
        return (
          <LineSerie key={line.color} data={line.data} color={line.color} />
        );
      })}
    </PlotXY>
  );
};
export const MultiLines = MultiLinesStory.bind({});
MultiLines.args = {
  dataArray: [
    {
      color: 'blue',
      data: [
        { x: 1, y: 100 },
        { x: 2, y: 10 },
        { x: 3, y: 50 },
        { x: 4, y: 20 },
        { x: 5, y: 80 },
        { x: 6, y: 30 },
        { x: 7, y: 0 },
        { x: 8, y: 20 },
        { x: 9, y: 100 },
        { x: 10, y: 55 },
        { x: 11, y: 60 },
        { x: 20, y: 80 },
      ],
    },
    {
      color: 'red',
      data: [
        { x: 1, y: 100 },
        { x: 2, y: 10 },
        { x: 3, y: 20 },
        { x: 4, y: 20 },
        { x: 5, y: 80 },
        { x: 6, y: 200 },
        { x: 7, y: 0 },
        { x: 8, y: 20 },
        { x: 9, y: 5 },
        { x: 10, y: 8 },
        { x: 11, y: 60 },
        { x: 20, y: 20 },
      ],
    },
  ],
  margins: {
    top: 20,
    right: 20,
    bottom: 50,
    left: 50,
  },
  height: 200,
  width: 400,
  xLabel: 'xLabel',
  yLabel: 'yLabel',
  ticks: { x: 5, y: 5 },
};
interface PlotFromJSONStoryProps {
  data: DataJSON;
  margins?: Margins;
  height: number;
  width: number;
  color: string;
  ticks?: { x: number; y: number };
}
const FromJSONStory: ComponentStory<
  (props: PlotFromJSONStoryProps) => JSX.Element
> = (props: PlotFromJSONStoryProps) => {
  const { data, margins, height, width, ticks, color } = props;
  const x = data.x;
  const y = data.y;
  const dataOff: Data[] = [];
  x.data.forEach((x, key) => {
    dataOff.push({ x: x, y: y.data[key] });
  });
  return (
    <JsonPlotXY
      color={color}
      data={data}
      margins={margins}
      width={width}
      height={height}
      ticks={ticks}
    />
  );
};

export const fromJSON = FromJSONStory.bind({});
fromJSON.args = {
  data: data,
  margins: {
    top: 20,
    right: 20,
    bottom: 50,
    left: 50,
  },
  height: 200,
  width: 400,
  color: 'red',
};
