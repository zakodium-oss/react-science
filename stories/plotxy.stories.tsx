import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { ComponentStory, Meta } from '@storybook/react';
import React from 'react';

import data from '../src/data/variables.json';
import PlotXY, {
  Data,
  DataXML,
  Margins,
  XmlPlotXY,
} from '../src/layout/PlotXY';
import LineSerie from '../src/layout/PlotXY/components/LineSerie';
import XYAxis from '../src/layout/PlotXY/components/axis/xy-axis';

export default {
  title: 'Layout/PlotXY',
  args: {},
} as Meta;
interface PlotMultiLinesStoryProps {
  dataArray: Data[][];
  margins?: Margins;
  height: number;
  width: number;
  ticks?: number;
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
      {dataArray.map((data, key) => {
        return (
          <LineSerie
            // eslint-disable-next-line react/no-array-index-key
            key={key}
            data={data}
            color={`#${Math.floor(Math.random() * 16777215).toString(16)}`} //random colors
          />
        );
      })}
    </PlotXY>
  );
};
export const MultiLines = MultiLinesStory.bind({});
MultiLines.args = {
  dataArray: [
    [
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
    [
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
};
interface PlotFromXMLStoryProps {
  data: DataXML;
  margins?: Margins;
  height: number;
  width: number;
  ticks?: number;
}
const FromXMLStory: ComponentStory<
  (props: PlotFromXMLStoryProps) => JSX.Element
> = (props: PlotFromXMLStoryProps) => {
  const { data, margins, height, width, ticks } = props;
  const x = data.x;
  const y = data.y;
  const dataOff: Data[] = [];
  x.data.forEach((x, key) => {
    dataOff.push({ x: x, y: y.data[key] });
  });
  return (
    <XmlPlotXY
      data={data}
      margins={margins}
      width={400}
      height={200}
      ticks={5}
    />
  );
};

export const fromXML = FromXMLStory.bind({});
fromXML.args = {
  data: data,
  margins: {
    top: 20,
    right: 20,
    bottom: 50,
    left: 50,
  },
  height: 200,
  width: 400,
};
