import { parseMPR, parseMPT } from 'biologic-converter';
import type { MeasurementVariable } from 'cheminfo-types';
import type { FileCollection } from 'filelist-utils';

import { MeasurementKind, getEmptyMeasurements } from '../DataState';
import type { MeasurementBase } from '../MeasurementBase';

import { createLogEntry, ParserLog } from './utility/parserLog';
import { templateFromFile } from './utility/templateFromFile';

/* the MeasurementBase has got a data key,
 and inside a variable key, compatible with this type */
type MeasurementDataVariable = Record<string, MeasurementVariable>;
/**
 * Loader for biologic files, using biologic-converter
 * @param fileCollection
 * @returns iv-MeasurementBase for each file in the collection
 */
export async function biologicLoader(fileCollection: FileCollection) {
  const measurements = getEmptyMeasurements();
  const kind: MeasurementKind = 'iv';
  const logs: ParserLog[] = [];

  for (const file of fileCollection.files) {
    try {
      if (/\.mpr$/i.test(file.name)) {
        const mpr = parseMPR(await file.arrayBuffer());
        const info = templateFromFile(file);
        // puts the "useful" variables at x and y for default plot.
        const variables = preferredXY(
          mpr.settings.variables.technique,
          mpr.data.variables,
        );
        const result: MeasurementBase = {
          title: file.name,
          ...info,
          meta: mpr.settings.variables,
          data: [{ variables }],
        };
        measurements[kind].entries.push(result);
      } else if (/\.mpt$/i.test(file.name)) {
        const mpt = parseMPT(await file.arrayBuffer());
        const info = templateFromFile(file);
        if (mpt.data?.variables) {
          // puts the "useful" variables at x and y for default plot.
          const variables = preferredXY(
            mpt.settings?.variables.technique,
            mpt.data.variables,
          );
          const result: MeasurementBase = {
            title: file.name,
            ...info,
            meta: mpt.settings?.variables || {},
            data: [{ variables }],
          };
          measurements[kind].entries.push(result);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        logs.push(createLogEntry({ error, relativePath: file.relativePath }));
      }
    }
  }
  // eslint-disable-next-line no-console
  if (logs.length > 0) console.log(logs);
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
      //Chronoamperometry or Chronocoulometry
      variables = setDefault(variables, 'time', 'x');
      // I am not sure how to find out whether it is Chronoamperometry or Chronocoulometry
      // (same experiment just changes what user is interested in.)
      variables = setDefault(variables, 'I', 'y');
      break;
    }
    case 'CP': {
      //Chronopotentiometry
      variables = setDefault(variables, 'time', 'x');
      variables = setDefault(variables, '<I>', 'y');
      break;
    }
    case 'CV': {
      //cyclic voltammetry
      variables = setDefault(variables, '<I>', 'y');
      variables = setDefault(variables, 'Ewe', 'x');
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
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
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
