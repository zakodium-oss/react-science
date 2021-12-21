import { ScaleLinear } from 'd3-scale';
import React, { forwardRef, MutableRefObject, useRef } from 'react';
import { useLinearPrimaryTicks } from 'react-d3-utils';

interface BaseAxis {
  x: number;
  y: number;
}
interface ScaleAxis {
  scale: ScaleLinear<number, number>;
}
interface TickAxis {
  ticks: Ticks[];
  ref: MutableRefObject<SVGGElement | null>;
}
interface Horizontal {
  width: number;
}
interface Vertical {
  height: number;
}
interface Ticks {
  label: string;
  position: number;
}
type HorizontalAxisProps = BaseAxis & Horizontal & ScaleAxis;
type VerticalAxisProps = BaseAxis & Vertical & ScaleAxis;
type HorizontalRenderProps = BaseAxis & Horizontal & TickAxis;
type VerticalRenderProps = BaseAxis & Vertical & TickAxis;

export function LinearHorizontalAxis(props: HorizontalAxisProps) {
  const { scale, ...other } = props;
  const ref = useRef<SVGGElement>(null);
  const ticks = useLinearPrimaryTicks(scale, 'horizontal', ref, {
    tickFormat: undefined,
  });
  return <HorizontalAxisBottom {...other} ticks={ticks} ref={ref} />;
}
const HorizontalAxisBottom = forwardRef<
  SVGGElement | null,
  HorizontalRenderProps
>(({ x, y, width, ticks }, ref) => (
  <g ref={ref} transform={`translate(${x}, ${y})`}>
    <line x2={width} y1={15} y2={15} stroke="black" />
    {ticks.map(({ label, position }, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <g key={index + label + position}>
        <line x1={position} x2={position} y1={15} y2={20} stroke="black" />
        <text x={position} y={30} dominantBaseline="middle" textAnchor="middle">
          {label}
        </text>
      </g>
    ))}
  </g>
));
const VerticalAxisLeft = forwardRef<SVGGElement | null, VerticalRenderProps>(
  ({ x, y, height, ticks }, ref) => (
    <g ref={ref} transform={`translate(${x}, ${y})`}>
      <line y2={height} x1={15} x2={15} stroke="black" />
      {ticks.map(({ label, position }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <g key={index + label + position}>
          <line y1={position} y2={position} x1={10} x2={15} stroke="black" />
          <text y={position} dominantBaseline="middle" textAnchor="end">
            {label}
          </text>
        </g>
      ))}
    </g>
  ),
);
export function LinearVerticalAxis(props: VerticalAxisProps) {
  const { scale, ...other } = props;
  const ref = useRef<SVGGElement>(null);
  const ticks = useLinearPrimaryTicks(scale, 'vertical', ref, {
    tickFormat: undefined,
  });

  return <VerticalAxisLeft {...other} ticks={ticks} ref={ref} />;
}
