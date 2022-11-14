import type { FileCollection } from 'filelist-utils';
import { parse, guessSpectraType } from 'spc-parser';

import { assert } from '../../utils/assert';
import type { MeasurementKind, Measurements } from '../DataState';
import type { MeasurementBase } from '../MeasurementBase';

import { getMeasurementInfoFromFile } from './utility/getMeasurementInfoFromFile';
import { ParserLog, createLogEntry } from './utility/parserLog';

/**
 *
 * @param fileCollection - the dragged file/files
 * @param logger - whether to log to console or not
 * @returns - new measurements object to be merged
 */
export async function spcLoader(
  fileCollection: FileCollection,
  logger?: boolean,
): Promise<Partial<Measurements>> {
  const measurements: Partial<Measurements> = {};
  const logs: ParserLog[] = [];
  for (const file of fileCollection) {
    if (/\.spc$/i.test(file.name)) {
      try {
        const parsed = parse(await file.arrayBuffer());
        const spectraType: MeasurementKind = guessSpectraType(parsed.meta);
        if (!measurements[spectraType]) {
          measurements[spectraType] = { entries: [] };
        }
        assert(
          measurements[spectraType],
          'Error while loading, kind is not defined',
        );
        measurements[spectraType]?.entries.push({
          meta: parsed.meta,
          ...getMeasurementInfoFromFile(file),
          title: parsed.meta.memo,
          data: parsed.spectra as unknown as MeasurementBase['data'],
        });
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
