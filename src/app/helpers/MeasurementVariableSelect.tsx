interface MeasurementVariableSelectProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
}

export function MeasurementVariableSelect(
  props: MeasurementVariableSelectProps,
) {
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
