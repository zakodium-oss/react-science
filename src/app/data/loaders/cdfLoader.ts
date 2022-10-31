import { v4 } from '@lukeed/uuid';
import type { FileCollection } from 'filelist-utils';
import { NetCDFReader } from 'netcdfjs';

import {
  MeasurementKind,
  Loader,
  Measurements,
  getEmptyMeasurements,
} from '../DataState';

export const cdfLoader: Loader = async function cdfLoader(
  fileCollection: FileCollection,
): Promise<Measurements> {
  const newMeasurements: Measurements = getEmptyMeasurements();
  for (const file of fileCollection) {
    if (file.name.match(/\.cdf$/i)) {
      const reader = new NetCDFReader(await file.arrayBuffer(), { meta: true });
      if (
        !reader.dataVariableExists('mass_values') ||
        !reader.dataVariableExists('time_values')
      ) {
        return newMeasurements;
      }

      const kind: MeasurementKind = 'gclcms';

      const times = reader.getDataVariable('scan_acquisition_time');
      const tics = reader.getDataVariable('total_intensity');
      const pointCount = reader.getDataVariable('point_count');
      const massValues = reader.getDataVariable('mass_values');
      const intensityValues = reader.getDataVariable('intensity_values');
      addMeta(reader, reader.globalAttributes);

      let index = 0;
      const allMasses: Float64Array[] = [];
      const allIntensities: Float64Array[] = [];
      for (let size of pointCount) {
        // Taken from: https://github.com/cheminfo/netcdf-gcms
        const masses = new Float64Array(size);
        const intensities = new Float64Array(size);
        for (let j = 0; j < size; j++) {
          masses[j] = massValues[index];
          intensities[j] = intensityValues[index++];
        }
        allIntensities.push(intensities);
        allMasses.push(masses);
      }
      newMeasurements[kind].entries.push({
        id: v4(),
        meta: reader.header.meta,
        filename: file.name,
        path: file.relativePath || '',
        info: {},
        title: reader.getAttribute('experiment_title'),
        data: normalizeChromatogram(times, allMasses, allIntensities, tics),
      });
    }
  }
  return newMeasurements;
};

function normalizeChromatogram(time, masses, intensities, tics) {
  let data: any = [];
  for (let i = 0; i < time.length; i++) {
    data.push({
      meta: {},
      info: {
        time: { value: time[i], units: 's' },
        tic: tics[i],
      },
      variables: {
        x: {
          symbol: 'X',
          label: 'm/z',
          units: '',
          data: masses[i] || [],
        },
        y: {
          symbol: 'Y',
          label: 'relative intensity',
          units: '',
          data: intensities[i] || [],
        },
      },
    });
  }
  return data;
}

function addMeta(reader, globalAttributes) {
  reader.header.meta = {};
  for (const item of globalAttributes) {
    reader.header.meta[item.name] = item.value;
  }
}
