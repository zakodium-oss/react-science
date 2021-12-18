import { ScaleLinear } from 'd3-scale';
import { createContext, useContext } from 'react';

import { Margins, TransitionType } from '../PlotXY';

//plot context
export interface PlotContextType {
  width: number;
  height: number;
  margins: Margins;
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
