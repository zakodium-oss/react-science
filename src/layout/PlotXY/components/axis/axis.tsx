/* eslint-disable @typescript-eslint/no-explicit-any */
import { axisBottom, axisLeft, AxisScale } from 'd3-axis';
import { select, selectAll } from 'd3-selection';
import { transition } from 'd3-transition';
import React, { useEffect } from 'react';

export default function Axis(props: {
  scale: AxisScale<number>;
  orient: string;
  ticks?: number;
  transform: string;
}) {
  const { scale, orient, ticks, transform } = props;
  const ref = React.createRef<SVGGElement>();
  useEffect(() => {
    const renderAxis = () => {
      const node: any = ref.current;
      let axis: any;

      if (orient === 'bottom') {
        axis = axisBottom(scale);
      }
      if (orient === 'left') {
        axis = axisLeft(scale).ticks(ticks);
      }
      select(node).call(axis);
    };
    const updateAxis = () => {
      const t: any = transition().duration(1000);

      if (orient === 'left') {
        const axis: any = axisLeft(scale).ticks(ticks);
        selectAll(`.${orient}`).transition(t).call(axis);
      }
    };
    renderAxis();
    return () => {
      updateAxis();
    };
  }, [orient, ref, scale, ticks]);

  return <g ref={ref} transform={transform} className={`${orient} axis`} />;
}
