import type { FilterXYType } from 'ml-signal-processing';
import filterXY from 'ml-signal-processing/FilterXYSchema.json';

import { Button, createTableColumnHelper, Table } from '../../components/index';

export interface Filter<OptionsType = string | number> {
  name: FilterXYType['name'];
  options?: Record<string, OptionsType>;
}
export interface SignalProcessingPanelProps {
  filters: Filter[];
  onChange: (filters: Filter[]) => void;
}
interface FilterOptionsInfo {
  defaultValue: string | number;
  choices?: string[];
  description: string;
}

// get filters information & default options values
const defaultFilters = filterXY.anyOf.map(({ properties }) => {
  const options: Record<string, FilterOptionsInfo> = {};
  for (const [key, value] of Object.entries(
    properties?.options?.properties || {},
  )) {
    options[key] = {
      defaultValue: value.default,
      choices: value.enum,
      description: value.description,
    };
  }

  return {
    name: properties.name.const as FilterXYType['name'],
    options,
  };
});

const columnHelper = createTableColumnHelper<Filter>();

export function SignalProcessingPanel(props: SignalProcessingPanelProps) {
  const { filters = [], onChange } = props;

  const columns = [
    columnHelper.display({
      header: ' ',
      cell: ({ row }) => {
        return (
          <div style={{ display: 'flex', gap: '3px' }}>
            <Button
              style={{ width: '15px' }}
              intent="success"
              onClick={() => {
                const newFilters = [...filters];
                newFilters.splice(
                  row.index + 1,
                  0,
                  getDefaultFilter(defaultFilters[0]),
                );
                onChange?.(newFilters);
              }}
            >
              +
            </Button>
            <Button
              style={{ width: '15px' }}
              intent="danger"
              onClick={() => {
                onChange?.(filters.filter((_, j) => j !== row.index));
              }}
            >
              -
            </Button>
          </div>
        );
      },
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: ({ row, getValue }) => {
        return (
          <select
            onChange={({ target }) => {
              const value = Number(target.value);
              if (!Number.isNaN(value)) {
                const filter = getDefaultFilter(defaultFilters[value]);
                const newFilters = [...filters];
                newFilters[row.index] = filter;
                onChange?.(newFilters);
              }
            }}
            style={{ border: '1px solid black' }}
            value={defaultFilters.findIndex((f) => f.name === getValue())}
          >
            {defaultFilters.map(({ name }, i: number) => (
              <option key={name} value={i}>
                {normalCase(name)}
              </option>
            ))}
          </select>
        );
      },
    }),
    columnHelper.accessor('options', {
      header: 'Options',
      cell: ({ row, getValue }) => {
        const options = getValue();
        if (!options) return null;
        return (
          <>
            {Object.entries(
              defaultFilters.find((f) => f.name === row.original.name)
                ?.options || {},
            ).map((option) =>
              optionInput(option, options, (value) => {
                const FilterOptions = {
                  ...filters[row.index].options,
                  [option[0]]: value,
                };
                const filter = {
                  name: filters[row.index].name,
                  options: FilterOptions,
                };
                const newFilters = [...filters];
                newFilters[row.index] = filter;
                onChange?.(newFilters);
              }),
            )}
          </>
        );
      },
    }),
  ];

  return (
    <div>
      <Table data={filters} columns={columns} bordered />
      {filters.length === 0 && (
        <Button
          style={{ width: '15px', margin: '5px 20px' }}
          intent="success"
          onClick={() => {
            const newFilters = [getDefaultFilter(defaultFilters[0])];
            onChange?.(newFilters);
          }}
        >
          +
        </Button>
      )}
    </div>
  );
}

function getDefaultFilter({ options, name }: Filter<FilterOptionsInfo>) {
  if (options) {
    const result: Record<string, string | number> = {};

    for (const [key, { defaultValue }] of Object.entries(options)) {
      result[key] = defaultValue;
    }
    return { name, options: result };
  }
  return { name };
}

function normalCase(str: string) {
  const result = str.replaceAll(/(?<upper>[A-Z])/g, ' $<upper>').trim();
  return result.charAt(0).toUpperCase() + result.slice(1);
}

function optionInput(
  [key, { description, choices }]: [string, FilterOptionsInfo],
  options: Record<string, string | number>,
  onChange: (value: string | number) => void,
) {
  return (
    <div style={{ marginTop: '5px' }} key={key}>
      {choices && choices.length > 0 ? (
        <select
          onChange={({ target }) => {
            const value = target.value;
            if (value) {
              onChange(value);
            }
          }}
          style={{ border: '1px solid black' }}
          value={options?.[key]}
        >
          <option value="" disabled selected>
            {normalCase(key)}
          </option>
          {choices.map((choice) => (
            <option key={choice} value={choice}>
              {normalCase(choice)}
            </option>
          ))}
        </select>
      ) : (
        <input
          style={{ border: '1px solid black', padding: '2px 5px' }}
          placeholder={normalCase(key)}
          onChange={({ target }) => {
            const value = target.value;
            if (value) {
              onChange(value);
            }
          }}
          value={options?.[key]}
        />
      )}
      <label style={{ marginLeft: '5px' }}>{description}</label>
    </div>
  );
}
