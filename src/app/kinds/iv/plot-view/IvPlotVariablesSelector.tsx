import {
  getAllVariableSymbols,
  useAppDispatch,
  useAppState,
} from '../../../../app-data/index';
import { assertNotNull } from '../../../../components/index';
import { MeasurementVariableSelect } from '../../../helpers/index';

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
    <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
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
