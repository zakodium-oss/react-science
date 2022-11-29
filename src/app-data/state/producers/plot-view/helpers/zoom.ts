import {
  AppState,
  MeasurementBase,
  MeasurementKind,
  Plot2DZoom,
} from '../../../index';

export function getInitialZoom(): Plot2DZoom {
  return {
    x: { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
    y: { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
  };
}

export function updateZoom(
  draft: AppState,
  kind: MeasurementKind,
  measurement: MeasurementBase,
) {
  let plotView = draft.view.plot[kind];
  if (!plotView) {
    plotView = {
      zoom: getInitialZoom(),
    };
    draft.view.plot[kind] = plotView;
  }
  // TODO: discuss this:
  // What about measurements that don't have x and y?
  // What about measurements that have multiple data?
  const firstDatum = measurement.data[0];
  if (
    typeof firstDatum.variables.x?.min === 'number' &&
    typeof firstDatum.variables.x?.max === 'number' &&
    typeof firstDatum.variables.y?.min === 'number' &&
    typeof firstDatum.variables.y?.max === 'number'
  ) {
    plotView.zoom.x.min = Math.min(
      plotView.zoom.x.min,
      firstDatum.variables.x.min,
    );
    plotView.zoom.x.max = Math.max(
      plotView.zoom.x.max,
      firstDatum.variables.x.max,
    );
    plotView.zoom.y.min = Math.min(
      plotView.zoom.y.min,
      firstDatum.variables.y.min,
    );
    plotView.zoom.y.max = Math.max(
      plotView.zoom.y.max,
      firstDatum.variables.y.max,
    );
  }
}
