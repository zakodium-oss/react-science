import { ReactElement } from 'react';
import { ResponsiveChart } from 'react-d3-utils';
import {
  Annotations,
  Axis,
  Plot,
  Series,
  useCrossHair,
  useDrawRectangle,
  usePlotEvents,
} from 'react-plot';

import { useAppDispatch, useAppState } from '../../../../app-data/index';
import { assert } from '../../../../components/index';
import { splitEntries } from '../../../helpers/index';

import IvSeries from './IvSeries';

export default function IvMeasurementsPlot() {
  const appState = useAppState();
  const dispatch = useAppDispatch();
  const crossHair = useCrossHair();
  const drawRectangle = useDrawRectangle({
    onEnd(rectangle) {
      dispatch({
        type: 'PLOT_ZOOM',
        payload: {
          kind: 'iv',
          zoom: {
            x: {
              min: Math.min(rectangle.x1, rectangle.x2),
              max: Math.max(rectangle.x2, rectangle.x1),
            },
            y: {
              min: Math.min(rectangle.y1, rectangle.y2),
              max: Math.max(rectangle.y2, rectangle.y1),
            },
          },
        },
      });
    },
  });
  usePlotEvents({
    onDoubleClick() {
      dispatch({ type: 'PLOT_ZOOM_OUT', payload: { kind: 'iv' } });
    },
  });
  const { unselectedOpacity } = appState.settings.plot;
  const ivView = appState.view.plot.iv;
  assert(ivView && !!ivView.xVariable && !!ivView.yVariable);
  const { selectedEntries, unselectedEntries } = splitEntries(appState, 'iv');

  const series: ReactElement[] = [];
  for (const { measurement, view } of unselectedEntries) {
    series.push(
      <IvSeries
        key={measurement.id}
        measurement={measurement}
        xVariableLabel={ivView.xVariable}
        yVariableLabel={ivView.yVariable}
        colorConfig={view.color}
        opacity={view.visible ? unselectedOpacity : 0}
      />,
    );
  }
  for (const { measurement, view } of selectedEntries) {
    series.push(
      <IvSeries
        key={measurement.id}
        measurement={measurement}
        xVariableLabel={ivView.xVariable}
        yVariableLabel={ivView.yVariable}
        colorConfig={view.color}
        opacity={view.visible ? undefined : 0}
      />,
    );
  }

  return (
    <ResponsiveChart>
      {({ width, height }) => (
        <Plot
          width={width}
          height={height}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <Series>{series}</Series>
          <Annotations>
            {crossHair.annotations}
            {drawRectangle.annotations}
          </Annotations>
          <Axis
            displayPrimaryGridLines
            position="bottom"
            label={ivView.xVariable}
            min={ivView.zoom.x.min}
            max={ivView.zoom.x.max}
          />
          <Axis
            displayPrimaryGridLines
            position="left"
            paddingStart="10"
            paddingEnd="10"
            label={ivView.yVariable}
            min={ivView.zoom.y.min}
            max={ivView.zoom.y.max}
          />
        </Plot>
      )}
    </ResponsiveChart>
  );
}
