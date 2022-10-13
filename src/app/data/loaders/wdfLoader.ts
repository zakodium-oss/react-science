import { v4 } from '@lukeed/uuid';
import { parse } from 'wdf-parser';

import { getEmptyMeasurements, Loader, Measurements } from '../DataState';

export const wdfLoader: Loader = async function wdfLoader(files: FileList) {
  const measurements: Measurements = getEmptyMeasurements();

  for (const file of files) {
    if (file.name.match(/\.wdf$/i)) {
      const parsed = parse(await file.arrayBuffer());

      // for now WDF file format is always expected to be Raman
      measurements.raman.entries.push({
        id: v4(),
        meta: parsed.fileHeader,
        filename: file.name,
        path: file.webkitRelativePath || '',
        info: {},
        title: parsed.fileHeader.title,
        data: normalizeSpectra(parsed.blocks),
      });
    }
  }
  return measurements;
};

function normalizeSpectra(blocks) {
  const yVariables = getYVariables(blocks);
  const origins = getOrigins(blocks);

  const data: any = [];
  for (let i = 0; i < yVariables.length; i++) {
    const yVariable = yVariables[i];
    let origin = origins[i] || {};

    data.push({
      variables: { x: getXVariable(blocks), y: yVariable },
      meta: { ...origin },
    });
  }
  return data;
}

function getXVariable(blocks) {
  const xBlock = blocks.filter(
    (block) => block.blockType === 'WDF_BLOCKID_XLIST',
  )[0];
  return {
    label: xBlock.xList.units.replace(/(.*) \((.*)\)/, '$1'),
    units: xBlock.xList.units.replace(/(.*) \((.*)\)/, '$2'),
    data: xBlock.xList.values.slice(),
  };
}

function getYVariables(blocks) {
  const dataBlock = blocks.filter(
    (block) => block.blockType === 'WDF_BLOCKID_DATA',
  )[0];
  const yVariables: any[] = [];
  for (let spectrum of dataBlock.spectrum) {
    yVariables.push({
      label: 'Arbitrary Intensity',
      data: spectrum,
    });
  }
  return yVariables;
}

function getOrigins(blocks) {
  const originBlock = blocks.filter(
    (block) => block.blockType === 'WDF_BLOCKID_ORIGIN',
  )[0];
  if (!originBlock) return [];

  const xPositions = originBlock.origins.filter(
    (entry) => entry.label === 'X',
  )[0];
  const yPositions = originBlock.origins.filter(
    (entry) => entry.label === 'Y',
  )[0];

  if (!xPositions || !yPositions) return [];

  const origins: any[] = [];
  for (let i = 0; i < xPositions.axisOrigins.length; i++) {
    // we should add some xIndex and yIndex based on https://github.com/cheminfo/raman-spectrum/blob/1d3bc62ebe2930f8c35fcf65689b090f5b22ba9e/src/utils/surfaceAnalysis.js#L15-L70
    origins.push({
      xPositionUnits: xPositions.unit,
      yPositionUnits: yPositions.unit,
      xPosition: xPositions.axisOrigins[i],
      yPosition: yPositions.axisOrigins[i],
    });
  }
  return origins;
}
