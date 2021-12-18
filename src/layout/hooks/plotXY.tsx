import { ScaleLinear } from 'd3-scale';
import {
  Children,
  createContext,
  isValidElement,
  ReactNode,
  useContext,
} from 'react';

import { TransitionType } from '../PlotXY';
import LineSerie from '../PlotXY/components/LineSerie';
import XYAxis from '../PlotXY/components/axis/xy-axis';

//plot context
export interface PlotContextType {
  width: number;
  height: number;
  top: number;
  right: number;
  left: number;
  bottom: number;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  ticks: number;
  t: TransitionType;
}

export const PlotContext = createContext<Partial<PlotContextType>>({});
export function usePlotContext() {
  const context = useContext(PlotContext);
  if (!context) {
    throw new Error('Plot compound component outside Plot context');
  }
  return context;
}
export function splitChildren(children: ReactNode) {
  let axes = null;
  let lineSeries = [];

  for (let child of Children.toArray(children)) {
    if (typeof child !== 'object' || !isValidElement(child)) {
      // eslint-disable-next-line no-console
      console.error('Invalid Plot child:', child);
      throw new Error('invalid Plot child');
    } else if (child.type === LineSerie) {
      lineSeries.push(child);
    } else if (child.type === XYAxis) {
      axes = child;
    } else {
      // eslint-disable-next-line no-console
      console.error('Invalid Plot child: ', child);
      throw new Error('invalid plot child');
    }
  }

  return {
    lineSeries,
    axes,
  };
}
