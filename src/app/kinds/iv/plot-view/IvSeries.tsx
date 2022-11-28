import { xyToXYObject } from 'ml-spectra-processing';
import { useMemo } from 'react';
import { LineSeries } from 'react-plot';

import { ColorConfig, IvMeasurement } from '../../../../app-data/index';
import { getColorFromConfig } from '../../../helpers/index';

interface IvSeriesProps {
  measurement: IvMeasurement;
  colorConfig: ColorConfig;
  opacity?: number;
}

export default function IvSeries(props: IvSeriesProps) {
  const { measurement, colorConfig, opacity } = props;
  const xVariable =
    measurement.data[0].variables.x ?? measurement.data[0].variables.a;
  const yVariable =
    measurement.data[0].variables.y ?? measurement.data[0].variables.b;
  const data = useMemo(
    () => xyToXYObject({ x: xVariable.data, y: yVariable.data }),
    [xVariable.data, yVariable.data],
  );
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
