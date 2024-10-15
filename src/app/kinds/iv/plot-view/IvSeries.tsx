import { xyToXYObject } from 'ml-spectra-processing';
import { useMemo } from 'react';
import { LineSeries } from 'react-plot';

import {
  type ColorConfig,
  getVariableByLabel,
  type IvMeasurement,
} from '../../../../app-data/index.js';
import { getColorFromConfig } from '../../../helpers/index.js';

interface IvSeriesProps {
  measurement: IvMeasurement;
  colorConfig: ColorConfig;
  opacity?: number;
  xVariableLabel: string;
  yVariableLabel: string;
}

export default function IvSeries(props: IvSeriesProps) {
  const { measurement, colorConfig, opacity, xVariableLabel, yVariableLabel } =
    props;
  const xVariable = getVariableByLabel(measurement, xVariableLabel);
  const yVariable = getVariableByLabel(measurement, yVariableLabel);
  const data = useMemo(() => {
    if (!xVariable?.data || !yVariable?.data) return null;
    return xyToXYObject({ x: xVariable.data, y: yVariable.data });
  }, [xVariable?.data, yVariable?.data]);
  if (!data) return null;
  return (
    <LineSeries
      key={measurement.id}
      data={data}
      lineStyle={{
        opacity,
        stroke: getColorFromConfig(colorConfig),
      }}
    />
  );
}
