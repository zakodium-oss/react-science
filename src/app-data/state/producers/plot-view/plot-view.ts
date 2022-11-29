import { assert } from '../../../../components/index';
import { iterateKindMeasurementsAndView } from '../../data/data.helpers';
import { AppStateProducer } from '../types';

import { getInitialZoom, updateZoom } from './helpers/zoom';

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
  const plotView = draft.view.plot[kind];
  assert(plotView);
  plotView.zoom = getInitialZoom();
  for (const { measurement } of iterateKindMeasurementsAndView(draft, kind)) {
    updateZoom(draft, kind, measurement);
  }
};
