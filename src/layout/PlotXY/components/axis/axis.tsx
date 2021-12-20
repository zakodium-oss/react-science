/* eslint-disable @typescript-eslint/no-explicit-any */
import { axisBottom, axisLeft, AxisScale } from 'd3-axis';
import { select } from 'd3-selection';
import React, { useMemo } from 'react';

export default function Axis(props: {
  scale: AxisScale<number>;
  orient: string;
  ticks?: number;
  transform: string;
}) {
  const { scale, orient, ticks, transform } = props;
  const axis: any = useMemo(() => {
    if (orient === 'bottom') {
      return axisBottom(scale);
    }
    if (orient === 'left') {
      return axisLeft(scale).ticks(ticks);
    }
  }, [orient, scale, ticks]);

  return <g ref={(node) => select(node).call(axis)} transform={transform} />;
}
