import { ScaleLinear } from 'd3-scale';
import React, { SVGProps } from 'react';

export default function Axis(props: {
  scale: ScaleLinear<number, number>;
  orient: string;
  ticks: number;
  transform: string;
}) {
  const { scale, orient, ticks, transform } = props;
  if (orient === 'bottom') {
    return (
      <Axes
        {...axisPropsFromTickScale(scale, ticks)}
        orient="BOTTOM"
        axisTreansform={transform}
      />
    );
  }
  if (orient === 'left') {
    return (
      <Axes
        {...axisPropsFromTickScale(scale, ticks)}
        orient="LEFT"
        axisTreansform={transform}
      />
    );
  }
}
function axisPropsFromTickScale(
  scale: ScaleLinear<number, number>,
  tickCount: number,
): PropsForAxis {
  const range = scale.range();
  const values = scale.ticks(tickCount);
  const position = scale.copy();
  return { range, values, position };
}
function translateX(scale0: Scaler, scale1: Scaler, d: number) {
  const x = scale0(d);
  return `translate(${isFinite(x) ? x : scale1(d)},0)`;
}

function translateY(scale0: Scaler, scale1: Scaler, d: number) {
  const y = scale0(d);
  return `translate(0,${isFinite(y) ? y : scale1(d)})`;
}

export const TOP = 'TOP';
export const RIGHT = 'RIGHT';
export const BOTTOM = 'BOTTOM';
export const LEFT = 'LEFT';

interface AxisProps {
  orient: string;
  range: Array<number>;
  values: Array<number>;
  position: Scaler;
  axisTreansform: string;
}

export function Axes(props: AxisProps) {
  const { range, values, position, axisTreansform: transfrom, orient } = props;

  const ticksTransform =
    orient === TOP || orient === BOTTOM ? translateX : translateY;
  const tickTransformer = (d: number) => ticksTransform(position, position, d);

  const k = orient === TOP || orient === LEFT ? -1 : 1;
  const isRight = orient === RIGHT;
  const isLeft = orient === LEFT;
  const isTop = orient === TOP;
  const isBottom = orient === BOTTOM;
  const isHorizontal = isRight || isLeft;
  const x = isHorizontal ? 'x' : 'y';
  const y = isHorizontal ? 'y' : 'x';

  const halfWidth = 1 / 2;
  const range0 = range[0] + halfWidth;
  const range1 = range[range.length - 1] + halfWidth;

  const spacing = Math.max(6, 0) + 3;

  return (
    <g
      fill={'none'}
      fontSize={10}
      textAnchor={isRight ? 'start' : isLeft ? 'end' : 'middle'}
      strokeWidth={1}
      transform={transfrom}
    >
      <path
        stroke={'black'}
        d={
          isHorizontal
            ? `M${k * 6},${range0}H${halfWidth}V${range1}H${k * 6}`
            : `M${range0},${k * 6}V${halfWidth}H${range1}V${k * 6}`
        }
      />
      {values.map((v: number) => {
        let lineProps: SVGProps<SVGLineElement> = { stroke: 'black' };
        lineProps[`${x}2`] = k * 6;
        lineProps[`${y}1`] = halfWidth;
        lineProps[`${y}2`] = halfWidth;

        let textProps: SVGProps<SVGTextElement> = {
          fill: 'black',
          dy: isTop ? '0em' : isBottom ? '0.71em' : '0.32em',
        };
        textProps[`${x}`] = k * spacing;
        textProps[`${y}`] = halfWidth;

        return (
          <g key={`tick-${v}`} opacity={1} transform={tickTransformer(v)}>
            <line {...lineProps} />
            <text {...textProps}>{v}</text>
          </g>
        );
      })}
    </g>
  );
}

//types
export type Scaler = (x: number) => number;

export interface BandedScale<T> {
  (x: T): number;
  domain(): Array<T>;
  range(): Array<number>;
  copy(): BandedScale<T>;
  bandwidth(): number;
  round(): boolean;
}

export interface TickScale<T> {
  (x: T): number;
  domain(): Array<T>;
  range(): Array<number>;
  ticks(count: number): Array<T>;
  tickFormat(count: number, fmt: string | null): (val: T) => string;
  copy(): TickScale<T>;
  round(): boolean;
}

export type Orients = 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT';

export interface AxisStyle {
  orient: Orients;
  tickSizeInner: number;
  tickSizeOuter: number;
  tickPadding: number;
  strokeWidth: number;
  strokeColor: string;
  tickFont: string;
  tickFontSize: number;
}

export interface PropsForAxis {
  range: Array<number>;
  values: Array<number>;
  position: Scaler;
}
