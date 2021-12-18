import { AxisScale } from 'd3-axis';
import React from 'react';

import Axis from './axis';

const XYAxis = ({
  xScale,
  yScale,
  height,
}: {
  xScale: AxisScale<number>;
  yScale: AxisScale<number>;
  height: number;
}) => {
  const xSettings = {
    scale: xScale,
    orient: 'bottom',
    transform: `translate(0, ${height})`,
  };
  const ySettings = {
    scale: yScale,
    orient: 'left',
    transform: 'translate(0, 0)',
    ticks: 6,
  };
  return (
    <g className="axis-group">
      <Axis {...xSettings} />
      <Axis {...ySettings} />
    </g>
  );
};

export default XYAxis;
