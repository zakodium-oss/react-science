import {
  getAllVariableSymbols,
  useAppDispatch,
  useAppState,
} from '../../../../app-data/index.js';
import { assertNotNull } from '../../../../components/index.js';
import { MeasurementVariableSelect } from '../../../helpers/index.js';

export default function IvPlotVariablesSelector() {
  const {
    data: {
      measurements: { iv: ivMeasurements },
    },
    view: {
      plot: { iv: ivPlot },
    },
  } = useAppState();
  const dispatch = useAppDispatch();
  assertNotNull(ivPlot);
  const allOptions = new Set<string>();
  for (const measurement of ivMeasurements.entries) {
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
        value={ivPlot.yVariable || ''}
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
        value={ivPlot.xVariable || ''}
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
