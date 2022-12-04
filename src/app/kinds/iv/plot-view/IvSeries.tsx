import { scaleLinear } from 'd3-scale';
import { xyToXYObject } from 'ml-spectra-processing';
import { useMemo } from 'react';
import { ScatterSeries } from 'react-plot';

import {
  ColorConfig,
  getVariableByLabel,
  IvMeasurement,
} from '../../../../app-data/index';
import { fixedGradientScales } from '../../../../components/index';
import { getColorFromConfig } from '../../../helpers/index';

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
  const data: Array<{ x: number; y: number; color?: string }> | null =
    useMemo(() => {
      if (!xVariable || !yVariable) return null;
      const xyData = xyToXYObject({ x: xVariable.data, y: yVariable.data });
      if (colorConfig.kind === 'fixedGradient') {
        const scale = scaleLinear<number>([
          yVariable.min as number,
          yVariable.max as number,
        ]).range([0, 1]);
        const gradient = fixedGradientScales[colorConfig.gradient];

        return xyData.map((xy) => ({
          ...xy,
          color: gradient(scale(xy.y)),
        }));
      }
      return xyData;
    }, [xVariable, yVariable, colorConfig]);
  if (!data) return null;
  return (
    <ScatterSeries
      key={measurement.id}
      data={data}
      displayLines
      displayMarkers={false}
      lineStyle={{
        opacity,
        stroke: getColorFromConfig(colorConfig),
      }}
    />
  );
}
