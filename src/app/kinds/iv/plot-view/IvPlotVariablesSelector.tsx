import { assertNotNullish } from '@zakodium/utils';

import {
  getAllVariableSymbols,
  useAppDispatch,
  useAppState,
} from '../../../../app-data/index.js';
import { MeasurementVariableSelect } from '../../../helpers/index.js';

export default function IvPlotVariablesSelector() {
  const {
    data: { measurements },
    view: { plot },
  } = useAppState();
  const dispatch = useAppDispatch();
  assertNotNullish(plot.iv);
  const allOptions = new Set<string>();
  for (const measurement of measurements.iv.entries) {
    const variables = getAllVariableSymbols(measurement);
    for (const variable of variables) {
      allOptions.add(variable);
    }
  }
  const options = Array.from(allOptions);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',

        gap: 30,
        fontSize: '1.125em',
      }}
    >
      <MeasurementVariableSelect
        label="Y variable"
        value={plot.iv.yVariable || ''}
        options={options}
        onSelect={(variable) =>
          dispatch({
            type: 'IV_PLOT_SELECT_VARIABLE',
            payload: { axis: 'y', variable },
          })
        }
      />
      <MeasurementVariableSelect
        label="X variable"
        value={plot.iv.xVariable || ''}
        options={options}
        onSelect={(variable) =>
          dispatch({
            type: 'IV_PLOT_SELECT_VARIABLE',
            payload: { axis: 'x', variable },
          })
        }
      />
    </div>
  );
}
