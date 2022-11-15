import type { FileCollection } from 'filelist-utils';
import { parse } from 'wdf-parser';

import type { Measurements } from '../DataState';
import type { MeasurementBase } from '../MeasurementBase';

import { getMeasurementInfoFromFile } from './utility/getMeasurementInfoFromFile';
import { ParserLog, createLogEntry } from './utility/parserLog';

/**
 *
 * @param fileCollection - the dragged file/files
 * @param logger - whether to log to console or not
 * @returns - new measurements object to be merged
 */
export async function wdfLoader(
  fileCollection: FileCollection,
  logs?: ParserLog[],
): Promise<Partial<Measurements>> {
  const measurements: Partial<Measurements> = {};
  const entries: MeasurementBase[] = [];

  for (const file of fileCollection) {
    if (/\.wdf$/i.test(file.name)) {
      try {
        const parsed = parse(await file.arrayBuffer());
        entries.push({
          meta: parsed.fileHeader,
          ...getMeasurementInfoFromFile(file),
          title: parsed.fileHeader.title,
          data: normalizeSpectra(parsed.blocks),
        });
      } catch (error) {
        if (error instanceof Error) {
          if (logs) {
            logs.push(
              createLogEntry({
                parser: 'wdf',
                error,
                message: 'error reading wdf file',
                relativePath: file.relativePath,
              }),
            );
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
