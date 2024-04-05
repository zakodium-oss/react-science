import { MeasurementVariable } from 'cheminfo-types';
import { FifoLogger } from 'fifo-logger';
import type { FileCollection } from 'filelist-utils';
import { parse, Wdf } from 'wdf-parser';

import type { MeasurementBase, Measurements } from '../index';

import { getMeasurementInfoFromFile } from './utility/getMeasurementInfoFromFile';

/**
 *
 * @param fileCollection - the dragged file/files
 * @param logger - whether to log to console or not
 * @returns - new measurements object to be merged
 */
export async function wdfLoader(
  fileCollection: FileCollection,
  logger?: FifoLogger,
): Promise<Partial<Measurements>> {
  const measurements: Partial<Measurements> = {};
  const entries: MeasurementBase[] = [];

  for (const file of fileCollection) {
    if (/\.wdf$/i.test(file.name)) {
      try {
        // TODO: load in parallel
        // eslint-disable-next-line no-await-in-loop
        const parsed = parse(await file.arrayBuffer());
        entries.push({
          meta: parsed.fileHeader,
          ...getMeasurementInfoFromFile(file, parsed.fileHeader.title),
          data: normalizeSpectra(parsed.blocks),
        });
      } catch (error) {
        if (error instanceof Error) {
          if (logger) {
            logger.error(error);
          } else {
            throw error;
          }
        }
      }
    }
  }

  measurements.raman = { entries };
  return measurements;
}

function normalizeSpectra(blocks: Wdf['blocks']) {
  const yVariables = getYVariables(blocks);
  const origins = getOrigins(blocks);

  const results: MeasurementBase['data'] = [];

  for (let i = 0; i < yVariables.length; i++) {
    const yVariable = yVariables[i];
    const origin = origins[i] || {};

    results.push({
      variables: { x: getXVariable(blocks), y: yVariable },
      meta: { ...origin },
    });
  }
  return results;
}

function getXVariable(blocks: Wdf['blocks']) {
  const xBlock = blocks.find(
    (block) => block.blockType === 'WDF_BLOCKID_XLIST',
  );

  const xList = xBlock?.xList;
  const groups = xList?.units.match(/(?<label>.*) \((?<units>.*)\)/)?.groups;

  if (!xList) {
    throw new Error('no xList data found in wdf file');
  }

  const xVariable: MeasurementVariable = {
    label: groups?.label || 'Arbitrary Units',
    units: groups?.units || '',
    data: Array.from(xList.values),
  };
  return xVariable;
}

function getYVariables(blocks: Wdf['blocks']) {
  const dataBlock = blocks.find(
    (block) => block.blockType === 'WDF_BLOCKID_DATA',
  );

  if (!dataBlock?.spectra) {
    throw new Error('no spectrum found in data block of wdf file');
  }

  const yVariables: MeasurementVariable[] = [];
  for (const spectrum of dataBlock.spectra) {
    yVariables.push({
      data: Array.from(spectrum),
      units: '',
      label: 'Arbitrary Intensity',
    });
  }

  return yVariables;
}

interface Origin {
  xPositionUnits: string;
  yPositionUnits: string;
  xPosition: number | bigint;
  yPosition: number | bigint;
}
function getOrigins(blocks: Wdf['blocks']) {
  const originBlock = blocks.find(
    (block) => block.blockType === 'WDF_BLOCKID_ORIGIN',
  );
  if (!originBlock) return [];

  const xPositions = originBlock.origins?.find((entry) => entry.label === 'X');
  const yPositions = originBlock.origins?.find((entry) => entry.label === 'Y');
  const xOrigins = xPositions?.axisOrigins;
  const yOrigins = yPositions?.axisOrigins;

  const origins: Origin[] = [];
  if (xOrigins && yOrigins) {
    for (let i = 0; i < xOrigins.length; i++) {
      // we should add some xIndex and yIndex based on https://github.com/cheminfo/raman-spectrum/blob/1d3bc62ebe2930f8c35fcf65689b090f5b22ba9e/src/utils/surfaceAnalysis.js#L15-L70
      origins.push({
        xPositionUnits: xPositions.unit,
        yPositionUnits: yPositions.unit,
        xPosition: xOrigins[i],
        yPosition: yOrigins[i],
      });
    }
  }
  return origins;
}
