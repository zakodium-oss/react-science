import type { FileCollection } from 'filelist-utils';
import { parse, guessSpectraType } from 'spc-parser';

import {
  getEmptyMeasurements,
  measurementKinds,
  MeasurementKind,
  Measurements,
} from '../DataState';
import type { MeasurementBase } from '../MeasurementBase';

import { ParserLog, createLogEntry } from './utility/parserLog';
import { templateFromFile } from './utility/templateFromFile';

/**
 *
 * @param fileCollection - the dragged file/files
 * @param logger - whether to log to console or not
 * @returns - new measurements object to be merged
 */
export async function spcLoader(
  fileCollection: FileCollection,
  logger?: boolean,
) {
  const measurements: Measurements = getEmptyMeasurements();
  const logs: ParserLog[] = [];
  for (const file of fileCollection) {
    if (/\.spc$/i.test(file.name)) {
      try {
        const parsed = parse(await file.arrayBuffer());
        const spectraType: MeasurementKind = guessSpectraType(parsed.meta);
        if (measurementKinds.includes(spectraType)) {
          measurements[spectraType].entries.push({
            meta: parsed.meta,
            ...templateFromFile(file),
            title: parsed.meta.memo,
            data: parsed.spectra as unknown as MeasurementBase['data'],
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          logs.push(
            createLogEntry({
              parser: 'spc-parser',
              relativePath: file.relativePath,
              error,
            }),
          );
        }
      }
    }
  }
  if (logger && logs.length > 0) {
    // eslint-disable-next-line no-console
    console.error(logs);
  }
  return measurements;
}
