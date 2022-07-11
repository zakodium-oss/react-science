import { useState } from 'react';

import { ValueRenderers } from '..';

import { Button } from './Button';
import filterXY from './FilterXYSchema.json';
import { Table } from './Table';

export interface Filter {
  name: string;
  options: Record<string, string | object>;
}
interface SignalProcessingPanelProps {
  filters?: Filter[];
  onChange?: (filters: Filter[]) => void;
}
export function SignalProcessingPanel(props: SignalProcessingPanelProps) {
  const { filters = [], onChange } = props;
  const defaultFilters = filterXY.anyOf.map(({ properties }) => {
    const options: Record<string, string | object> = {};
    Object.entries(properties.options?.properties || {}).forEach(
      ([key, value]) => {
        options[key] = value.default;
      },
    );
    return {
      name: properties.name.enum[0],
      options,
    };
  });
  function normalCase(str: string) {
    const result = str.replace(/([A-Z])/g, ' $1').trim();
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
  const [{ index, filter }, setSelected] = useState<{
    //filter index in default filters
    index: number;
    filter: Filter;
  }>({
    index: 0,
    filter: defaultFilters[0],
  });
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
            {Object.entries(options).map(([key, value]) =>
              typeof value === 'object' ? (
                <ValueRenderers.Object key={key} value={value} />
              ) : (
                <ValueRenderers.Text key={key} value={value} />
              ),
            )}
          </Table.Row>
        ))}
      </Table>
      <div style={{ display: 'flex', gap: '4px', margin: '10px 0px' }}>
        <Button
          style={{ width: '10px', marginLeft: '5px' }}
          color={{ basic: 'white' }}
          backgroundColor={{ basic: 'green' }}
          onClick={() => {
            onChange?.([...filters, filter]);
          }}
        >
          +
        </Button>
        <select
          onChange={({ target }) => {
            const value = Number(target.value);
            if (!isNaN(value)) {
              setSelected({ index: value, filter: defaultFilters[value] });
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
        {Object.keys(filter.options).map((option) => (
          <input
            key={`${index}-${option}`}
            style={{ border: '1px solid black', padding: '2px 5px' }}
            placeholder={normalCase(option)}
            onChange={({ target }) => {
              const value = target.value;
              if (value) {
                filter.options[option] = value;
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
