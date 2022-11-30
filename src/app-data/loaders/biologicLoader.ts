import { parseMPR, parseMPT } from 'biologic-converter';
import type { MeasurementVariable } from 'cheminfo-types';
import type { FileCollection } from 'filelist-utils';

import type { Measurements, MeasurementBase } from '../index';

import { getMeasurementInfoFromFile } from './utility/getMeasurementInfoFromFile';
import { createLogEntry, ParserLog } from './utility/parserLog';

/* the MeasurementBase has got a data key,
 and inside a variable key, compatible with this type */
type MeasurementDataVariable = Record<string, MeasurementVariable>;
/**
 *
 * @param fileCollection - the dragged file/files
 * @param logs - pass to append errors to the logs, it mutates the external array.
 * @returns - new measurements object to be merged
 */
export async function biologicLoader(
  fileCollection: FileCollection,
  logs?: ParserLog[],
): Promise<Partial<Measurements>> {
  const measurements: Partial<Measurements> = {};
  const entries: MeasurementBase[] = [];

  for (const file of fileCollection.files) {
    try {
      if (/\.mpr$/i.test(file.name)) {
        const mpr = parseMPR(await file.arrayBuffer());
        const meta = mpr.settings.variables;
        const info = getMeasurementInfoFromFile(
          file,
          `Experiment: ${meta.technique}`,
        );
        // puts the "useful" variables at x and y for default plot.
        const variables = preferredXY(meta.technique, mpr.data.variables);
        const result: MeasurementBase = {
          ...info,
          meta,
          data: [{ variables }],
        };
        entries.push(result);
      } else if (/\.mpt$/i.test(file.name)) {
        const { data, settings } = parseMPT(await file.arrayBuffer());
        if (data.variables) {
          const metaData = settings?.variables;
          const info = getMeasurementInfoFromFile(
            file,
            metaData?.technique
              ? `Experiment: ${metaData.technique}`
              : file.name,
          );
          // puts the "useful" variables at x and y for default plot.
          const variables = preferredXY(metaData?.technique, data.variables);
          const result: MeasurementBase = {
            ...info,
            meta: metaData || {},
            data: [{ variables }],
          };
          entries.push(result);
        }
      }
    } catch (error) {
      //send error to UI to show to User ?
      if (error instanceof Error) {
        if (logs) {
          logs.push(createLogEntry({ error, relativePath: file.relativePath }));
        } else {
          throw error;
        }
      }
    }
  }
  measurements.iv = { entries };
  return measurements;
}

/**
 * Each biologic experiment stores measurement variables (not just `x` and `y`) in the
 * `data.variables` object.
 * this function takes "useful ones", and place them as `x` and `y`.
 * so they are default for the plot.
 * @param technique technique used in the experiment
 * @param variables experiment variables
 * @returns the same data (and type) with rearranged variables.
 * (does not need return type as it is inferred)
 */
function preferredXY(
  technique: string | undefined,
  variables: MeasurementDataVariable,
) {
  if (!technique) return variables;

  switch (technique) {
    case 'CA': {
      //Chronoamperometry or Chronocoulometry (distinguish?)
      variables = setDefault(variables, 'I', 'y');
      variables = setDefault(variables, 'time', 'x');
      break;
    }
    case 'CP': {
      //Chronopotentiometry. <average>
      variables = setDefault(variables, '<Ewe>', 'y');
      variables = setDefault(variables, 'time', 'x');
      break;
    }
    case 'CV': {
      //cyclic voltammetry. <average>
      variables = setDefault(variables, '<I>', 'y');
      variables = setDefault(variables, 'Ewe', 'x');
      break;
    }
    case 'GCPL': {
      variables = setDefault(variables, 'Ewe', 'y');
      variables = setDefault(variables, 'time', 'x');
      break;
    }
    case 'OCV': {
      variables = setDefault(variables, 'Ewe', 'y');
      variables = setDefault(variables, 'time', 'x');
      break;
    }
    default:
      break;
  }
  return variables;
}
/**
 * Stores object with "label" at either "x" or "y".
 * the data stored is still the same.
 * @param variables experimental variables
 * @param label label to search for in the variables object (time, potential, current, etc)
 * @param storeAt which key to move that data to
 * @returns the new variables object.
 */
function setDefault(
  variables: MeasurementDataVariable,
  label: string,
  storeAt: 'x' | 'y',
) {
  for (const varum in variables) {
    // find the key with `label` (or skip if not found)
    if (
      variables[varum].label === label && //if not already at the right key
      varum !== storeAt
    ) {
      // populate key, if there is no data there.
      if (!variables[storeAt]) {
        variables[storeAt] = variables[varum];
        delete variables[varum];
      } else {
        // if the storeAt is already occupied, swap the two
        const originalX = variables[storeAt];
        const newX = variables[varum];
        variables[storeAt] = newX;
        variables[varum] = originalX;
      }
    }
  }
  return variables;
}
