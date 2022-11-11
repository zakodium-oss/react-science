import { v4 } from '@lukeed/uuid';
import type { FileCollection } from 'filelist-utils';
import { parse } from 'wdf-parser';

import type { Measurements } from '../DataState';
import type { MeasurementBase } from '../MeasurementBase';

export async function wdfLoader(fileCollection: FileCollection) {
  const measurements: Partial<Measurements> = {};
  const entries: MeasurementBase[] = [];
  for (const file of fileCollection) {
    if (file.name.match(/\.wdf$/i)) {
      const parsed = parse(await file.arrayBuffer());

      // for now WDF file format is always expected to be Raman
      entries.push({
        id: v4(),
        meta: parsed.fileHeader,
        filename: file.name,
        path: file.relativePath || '',
        info: {},
        title: parsed.fileHeader.title,
        data: normalizeSpectra(parsed.blocks),
      });
    }
  }
  measurements.raman = { entries };
  return measurements;
}

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
  const xBlock = blocks.find(
    (block) => block.blockType === 'WDF_BLOCKID_XLIST',
  );

  const groups = xBlock.xList.units.match(
    /(?<label>.*) \((?<units>.*)\)/,
  )?.groups;

  return {
    label: groups?.label || 'Arbitrary Units',
    units: groups?.units || '',
    data: xBlock.xList.values.slice(),
  };
}

function getYVariables(blocks) {
  const dataBlock = blocks.find(
    (block) => block.blockType === 'WDF_BLOCKID_DATA',
  );
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
  const originBlock = blocks.find(
    (block) => block.blockType === 'WDF_BLOCKID_ORIGIN',
  );
  if (!originBlock) return [];

  const xPositions = originBlock.origins.find((entry) => entry.label === 'X');
  const yPositions = originBlock.origins.find((entry) => entry.label === 'Y');

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