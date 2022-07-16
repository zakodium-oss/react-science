import { FilterXYType } from 'ml-signal-processing';
import filterXY from 'ml-signal-processing/FilterXYSchema.json';

import { ValueRenderers } from '..';

import { Button } from './Button';
import { Table } from './Table';

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
  Object.entries(properties?.options?.properties || {}).forEach(
    ([key, value]) => {
      options[key] = {
        defaultValue: value.default,
        choices: value.enum,
        description: value.description,
      };
    },
  );
  return {
    name: properties.name.enum[0] as FilterXYType['name'],
    options,
  };
});
export function SignalProcessingPanel(props: SignalProcessingPanelProps) {
  const { filters = [], onChange } = props;

  return (
    <div>
      <Table border={false}>
        <Table.Header>
          <ValueRenderers.Title value=" " />
          <ValueRenderers.Title value="Name" />
          <ValueRenderers.Title value="Options" />
        </Table.Header>
        {filters.map(({ name, options }, i) => (
          <Table.Row key={i} border>
            <ValueRenderers.Component>
              <div style={{ display: 'flex', gap: '3px' }}>
                <Button
                  style={{ width: '15px' }}
                  color={{ basic: 'white' }}
                  backgroundColor={{ basic: 'green' }}
                  onClick={() => {
                    const newfilters = [...filters];
                    newfilters.splice(
                      i + 1,
                      0,
                      getDefaultFilter(defaultFilters[0]),
                    );
                    onChange?.(newfilters);
                  }}
                >
                  +
                </Button>
                <Button
                  style={{ width: '15px' }}
                  color={{ basic: 'white' }}
                  backgroundColor={{ basic: 'red' }}
                  onClick={() => {
                    onChange?.(filters.filter((_, j) => j !== i));
                  }}
                >
                  -
                </Button>
              </div>
            </ValueRenderers.Component>
            <ValueRenderers.Component>
              <select
                onChange={({ target }) => {
                  const value = Number(target.value);
                  if (!isNaN(value)) {
                    const filter = getDefaultFilter(defaultFilters[value]);
                    const newfilters = [...filters];
                    newfilters[i] = filter;
                    onChange?.(newfilters);
                  }
                }}
                style={{ border: '1px solid black' }}
                value={defaultFilters.findIndex((f) => f.name === name)}
              >
                {defaultFilters.map(({ name }, i) => (
                  <option key={name} value={i}>
                    {normalCase(name)}
                  </option>
                ))}
              </select>
            </ValueRenderers.Component>
            {options && (
              <ValueRenderers.Component>
                {Object.entries(
                  defaultFilters.find((f) => f.name === name)?.options || {},
                ).map((option) =>
                  optionInput(option, options, (value) => {
                    const FilterOptions = {
                      ...filters[i].options,
                      [option[0]]: value,
                    };
                    const filter = {
                      name: filters[i].name,
                      options: FilterOptions,
                    };
                    const newfilters = [...filters];
                    newfilters[i] = filter;
                    onChange?.(newfilters);
                  }),
                )}
              </ValueRenderers.Component>
            )}
          </Table.Row>
        ))}
      </Table>
      {filters.length === 0 && (
        <Button
          style={{ width: '15px', margin: '5px 20px' }}
          color={{ basic: 'white' }}
          backgroundColor={{ basic: 'green' }}
          onClick={() => {
            const newfilters = [getDefaultFilter(defaultFilters[0])];
            onChange?.(newfilters);
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

    Object.entries(options).forEach(([key, { defaultValue }]) => {
      result[key] = defaultValue;
    });
    return { name, options: result };
  }
  return { name };
}
function normalCase(str: string) {
  const result = str.replace(/([A-Z])/g, ' $1').trim();
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
