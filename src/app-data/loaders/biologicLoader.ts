import { parseMPR, parseMPT } from 'biologic-converter';
import type { MeasurementVariable } from 'cheminfo-types';
import type { FileCollection } from 'filelist-utils';

import { MeasurementKind, getEmptyMeasurements } from '../DataState';
import type { MeasurementBase } from '../MeasurementBase';

import { templateFromFile } from './utility/templateFromFile';
import { createLogEntry, ParserLog } from './utility/parserLog';

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
  let result: MeasurementBase;

  for (const file of fileCollection.files) {
    try {
      if (file.name.endsWith('.mpr')) {
        const mpr = parseMPR(await file.arrayBuffer());
        const prepare = templateFromFile(file);
        // puts the "useful" variables at x and y for default plot.
        const variables = preferredXY(
          prepare.meta.technique,
          mpr.data.variables,
        );
        result = {
          ...prepare,
          meta: mpr.settings.variables,
          data: [{ variables }],
        };
        measurements[kind].entries.push(result);
      } else if (file.name.endsWith('.mpt')) {
        const mpt = parseMPT(await file.arrayBuffer());
        const prepare = templateFromFile(file);
        if (mpt.data?.variables) {
          // puts the "useful" variables at x and y for default plot.
          const variables = preferredXY(
            prepare.meta?.technique,
            mpt.data.variables,
          );
          result = {
            ...prepare,
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
  console.error(logs);
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
      return variables;
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
  for (let varum in variables) {
    // find the key that has the label (or skip if not found)
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
        // if the storeAt is already occupied, we swap the two
        const originalX = variables[storeAt];
        const newX = variables[varum];
        variables[storeAt] = newX;
        variables[varum] = originalX;
      }
    }
  }
  return variables;
}
