import { assert } from '../../../../../components/index.js';
import {
  getPreferredVariable,
  getVariableByLabel,
} from '../../../../helpers/index.js';
import type {
  AppState,
  MeasurementBase,
  MeasurementKind,
  Plot2DZoom,
} from '../../../index.js';
import { iterateKindMeasurementsAndView } from '../../../index.js';

export function getInitialZoom(): Plot2DZoom {
  return {
    x: { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
    y: { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
  };
}

export function resetZoom(draft: AppState, kind: MeasurementKind): void {
  const plotView = draft.view.plot[kind];
  assert(plotView);
  plotView.zoom = getInitialZoom();
  for (const { measurement } of iterateKindMeasurementsAndView(draft, kind)) {
    updateZoom(draft, kind, measurement);
  }
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
      xVariable: getPreferredVariable(measurement, 'x').label,
      yVariable: getPreferredVariable(measurement, 'y').label,
    };
    draft.view.plot[kind] = plotView;
  }

  const xVariable = plotView.xVariable;
  const yVariable = plotView.yVariable;
  assert(xVariable && yVariable);

  const mXVariable = getVariableByLabel(measurement, xVariable);
  const mYVariable = getVariableByLabel(measurement, yVariable);

  if (
    typeof mXVariable?.min === 'number' &&
    typeof mXVariable?.max === 'number' &&
    typeof mYVariable?.min === 'number' &&
    typeof mYVariable?.max === 'number'
  ) {
    plotView.zoom.x.min = Math.min(plotView.zoom.x.min, mXVariable.min);
    plotView.zoom.x.max = Math.max(plotView.zoom.x.max, mXVariable.max);
    plotView.zoom.y.min = Math.min(plotView.zoom.y.min, mYVariable.min);
    plotView.zoom.y.max = Math.max(plotView.zoom.y.max, mYVariable.max);
  }
}
