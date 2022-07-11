import { useState } from 'react';

import { ValueRenderers } from '..';

import { Button } from './Button';
import filterXY from './FilterXYSchema.json';
import { Table } from './Table';

export interface Filter {
  name: string;
  options: Record<string, string>;
}
interface SignalProcessingPanelProps {
  filters?: Filter[];
  onChange?: (filters: Filter[]) => void;
}
export function SignalProcessingPanel(props: SignalProcessingPanelProps) {
  const { filters: addedFilters = [], onChange } = props;
  const filters = filterXY.anyOf.map(({ properties }) => {
    const options: Record<string, string> = {};
    Object.keys(properties.options?.properties || {}).forEach(
      (key) => (options[key] = ''),
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
    index: number;
    filter: Filter;
  }>({
    index: 0,
    filter: filters[0],
  });
  return (
    <div>
      <Table>
        <Table.Header>
          <ValueRenderers.Title value="Name" />
          <ValueRenderers.Title value="Options" />
        </Table.Header>
        {addedFilters.map(({ name, options }) => (
          <Table.Row key={name}>
            <ValueRenderers.Text value={normalCase(name)} />
            {Object.entries(options).map(([key, value]) => (
              <ValueRenderers.Text key={key} value={value} />
            ))}
          </Table.Row>
        ))}
      </Table>
      <div style={{ display: 'flex', gap: '4px', margin: '10px 0px' }}>
        <Button
          color={{ basic: 'white' }}
          backgroundColor={{ basic: 'green' }}
          onClick={() => {
            onChange?.([...addedFilters, filters[index]]);
          }}
        >
          +
        </Button>
        <select
          onChange={({ target }) => {
            const value = Number(target.value);
            if (!isNaN(value)) {
              setSelected({ index: value, filter: filters[value] });
            }
          }}
          style={{ border: '1px solid black' }}
        >
          {filters.map(({ name }, i) => (
            <option key={name} value={i}>
              {normalCase(name)}
            </option>
          ))}
        </select>
        {Object.keys(filter.options).map((option, i) => (
          <input
            key={i}
            style={{ border: '1px solid black', padding: '2px 5px' }}
            placeholder={normalCase(option)}
          />
        ))}
      </div>
    </div>
  );
}
