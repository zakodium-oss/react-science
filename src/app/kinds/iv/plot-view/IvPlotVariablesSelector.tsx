import {
  getAllVariableSymbols,
  useAppDispatch,
  useAppState,
} from '../../../../app-data/index';
import { assertNotNull } from '../../../../components/index';

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
      <SelectVariable
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
      <SelectVariable
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

interface SelectVariableProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
}

function SelectVariable(props: SelectVariableProps) {
  const { label, value, options, onSelect } = props;
  return (
    <label>
      {`${label}: `}
      <select
        value={value}
        onChange={(event) => {
          const value = event.target.value;
          if (value) {
            onSelect(value);
          }
        }}
      >
        <option value="">{`<select a variable>`}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
