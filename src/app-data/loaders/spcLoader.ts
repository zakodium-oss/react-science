import type { FifoLogger } from 'fifo-logger';
import type { FileCollection } from 'filelist-utils';
import { guessSpectraType, parse } from 'spc-parser';

import { assert } from '../../components/index';
import type { MeasurementBase, MeasurementKind, Measurements } from '../index';

import { getMeasurementInfoFromFile } from './utility/getMeasurementInfoFromFile';

/**
 *
 * @param fileCollection - the dragged file/files
 * @param logger - whether to log to console or not
 * @returns - new measurements object to be merged
 */
export async function spcLoader(
  fileCollection: FileCollection,
  logger?: FifoLogger,
): Promise<Partial<Measurements>> {
  const measurements: Partial<Measurements> = {};
  for (const file of fileCollection) {
    if (/\.spc$/i.test(file.name)) {
      try {
        // TODO: load in parallel
        // eslint-disable-next-line no-await-in-loop
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
          ...getMeasurementInfoFromFile(file, parsed.meta.memo),
          data: parsed.spectra as unknown as MeasurementBase['data'],
        });
      } catch (error) {
        if (error instanceof Error && logger) {
          logger.error(error);
        } else {
          throw error;
        }
      }
    }
  }

  return measurements;
}
