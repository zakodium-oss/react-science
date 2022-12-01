import { assert } from '../../../../components/index';
import { AppStateProducer } from '../types';

import { resetZoom } from './helpers/zoom';

export const plotZoom: AppStateProducer<'PLOT_ZOOM'> = (draft, action) => {
  const { kind, zoom } = action.payload;
  const plotView = draft.view.plot[kind];
  assert(plotView);
  plotView.zoom = zoom;
};

export const plotZoomOut: AppStateProducer<'PLOT_ZOOM_OUT'> = (
  draft,
  action,
) => {
  const { kind } = action.payload;
  resetZoom(draft, kind);
};

export const ivPlotSelectVariable: AppStateProducer<
  'IV_PLOT_SELECT_VARIABLE'
> = (draft, action) => {
  const { axis, variable } = action.payload;
  const plotView = draft.view.plot.iv;
  assert(plotView);
  plotView[`${axis}Variable`] = variable;
  resetZoom(draft, 'iv');
};
