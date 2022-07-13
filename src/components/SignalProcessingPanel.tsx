import filterXY from 'ml-signal-processing/FilterXYSchema.json';
import { useState } from 'react';

import { ValueRenderers } from '..';

import { Button } from './Button';
import { Table } from './Table';

interface FilterStateOptions {
  value: string;
  enum: string[];
  description: string;
}
export interface Filter<OptionsType = string> {
  name: string;
  options: Record<string, OptionsType>;
}
interface SignalProcessingPanelProps {
  filters?: Filter[];
  onChange?: (filters: Filter[]) => void;
}
const defaultFilters: Filter<FilterStateOptions>[] = filterXY.anyOf.map(
  ({ properties }) => {
    const options: Record<string, FilterStateOptions> = {};
    Object.entries(properties?.options?.properties || {}).forEach(
      ([key, value]) => {
        options[key] = {
          value: value.default,
          enum: value.enum,
          description: value.description,
        };
      },
    );
    return {
      name: properties.name.enum[0],
      options,
    };
  },
);
export function SignalProcessingPanel(props: SignalProcessingPanelProps) {
  const { filters = [], onChange } = props;

  const [filter, setSelected] = useState<Filter<FilterStateOptions>>(
    defaultFilters[0],
  );
  function optionInput([key, option]: [string, FilterStateOptions]) {
    return (
      <div style={{ marginTop: '5px' }} key={key}>
        {option.enum && option.enum.length > 0 ? (
          <select
            onChange={({ target }) => {
              const value = target.value;
              if (value && filter.options) {
                const FilterOptions = filter.options;
                FilterOptions[key].value = value;
                setSelected(({ name }) => ({
                  name,
                  options: FilterOptions,
                }));
              }
            }}
            style={{ border: '1px solid black' }}
          >
            <option value="" disabled selected>
              {normalCase(key)}
            </option>
            {option.enum.map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        ) : (
          <input
            style={{ border: '1px solid black', padding: '2px 5px' }}
            placeholder={normalCase(key)}
            onChange={({ target }) => {
              const value = target.value;
              if (value && filter.options) {
                const FilterOptions = filter.options;
                FilterOptions[key].value = value;
                setSelected(({ name }) => ({
                  name,
                  options: FilterOptions,
                }));
              }
            }}
          />
        )}
        <label> {option.description}</label>
      </div>
    );
  }
  return (
    <div>
      <Table border={false}>
        <Table.Header>
          <ValueRenderers.Title value=" " />
          <ValueRenderers.Title value="Name" />
          <ValueRenderers.Title value="Options" />
        </Table.Header>
        {filters.map(({ name, options }, i) => (
          <Table.Row key={i}>
            <ValueRenderers.Component>
              <Button
                style={{ width: '10px' }}
                color={{ basic: 'white' }}
                backgroundColor={{ basic: 'red' }}
                onClick={() => {
                  onChange?.(filters.filter((_, j) => j !== i));
                }}
              >
                -
              </Button>
            </ValueRenderers.Component>
            <ValueRenderers.Text value={normalCase(name)} />
            {options &&
              Object.entries(options).map(([key, value]) =>
                typeof value === 'object' ? (
                  <ValueRenderers.Object key={key} value={value} />
                ) : (
                  <ValueRenderers.Text key={key} value={value} />
                ),
              )}
          </Table.Row>
        ))}
      </Table>
      <div
        style={{
          marginTop: '10px',
          display: 'flex',
          gap: '10px',
          width: '300px',
        }}
      >
        <Button
          style={{ width: '10px', marginLeft: '5px' }}
          color={{ basic: 'white' }}
          backgroundColor={{ basic: 'green' }}
          onClick={() => {
            onChange?.([...filters, getFilterValue(filter)]);
          }}
        >
          +
        </Button>
        <select
          onChange={({ target }) => {
            const value = Number(target.value);
            if (!isNaN(value)) {
              setSelected(defaultFilters[value]);
            }
          }}
          style={{ border: '1px solid black' }}
        >
          {defaultFilters.map(({ name }, i) => (
            <option key={name} value={i}>
              {normalCase(name)}
            </option>
          ))}
        </select>
      </div>

      {Object.entries(filter.options).map((option) => optionInput(option))}
    </div>
  );
}
function getFilterValue({ options, name }: Filter<FilterStateOptions>) {
  const result: Record<string, string> = {};
  if (options) {
    Object.entries(options).forEach(([key, { value }]) => {
      result[key] = value;
    });
  }
  return { name, options: result };
}
function normalCase(str: string) {
  const result = str.replace(/([A-Z])/g, ' $1').trim();
  return result.charAt(0).toUpperCase() + result.slice(1);
}
