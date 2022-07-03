import { useState } from 'react';
import { ObjectInspector } from 'react-inspector';

import { ValueRenderers } from '..';

import { Table } from './Table';
import { MeasurementBase } from './context/data/DataState';

export interface MeasurementInfoPanelProps {
  measurement: MeasurementBase;
}

export function MeasurementInfoPanel(props: MeasurementInfoPanelProps) {
  const {
    measurement: { meta, info },
  } = props;

  const [search, setSearch] = useState('');
  const metaRows = (search: string) =>
    Object.keys(meta).map((key) => {
      const value = meta[key];
      if (
        !key.toLowerCase().includes(search.toLowerCase()) &&
        !valueSearch(value, search)
      ) {
        return null;
      }

      return (
        <Table.Row key={key}>
          <ValueRenderers.Text value={key} />
          {valueCell(value)}
        </Table.Row>
      );
    });
  const infoRows = (search: string) =>
    Object.keys(info).map((key) => {
      const value = info[key];
      if (
        !key.toLowerCase().includes(search.toLowerCase()) &&
        !valueSearch(value, search)
      ) {
        return null;
      }
      return (
        <Table.Row key={key}>
          <ValueRenderers.Text value={key} />
          {valueCell(value)}
        </Table.Row>
      );
    });

  return (
    <div>
      <input
        style={{
          border: 'solid 1px black',
          width: '300px',
          marginBottom: '10px',
          padding: '3px',
        }}
        value={search}
        placeholder="search for a parameter ..."
        onChange={({ target }) => {
          if (target.value !== undefined) setSearch(target.value);
        }}
      />
      <Table>
        <Table.Header>
          <ValueRenderers.Title value="Parameter" />
          <ValueRenderers.Title value="Value" />
        </Table.Header>
        {metaRows(search)}
        {infoRows(search)}
      </Table>
    </div>
  );
}

// get the value cell depending on the type of the value
function valueCell(value: number | string | object) {
  switch (typeof value) {
    case 'number':
      return <ValueRenderers.Number value={value} />;
    case 'object':
      return <ObjectInspector data={value} />;
    case 'string':
      return <ValueRenderers.Text value={value} />;
    default:
      <ValueRenderers.Text value={value} />;
  }
}

// search a string in different type of values
function valueSearch(value: number | string | object, search: string): boolean {
  switch (typeof value) {
    case 'number':
      return String(value).includes(search.toLowerCase());
    case 'object':
      return JSON.stringify(value).toLowerCase().includes(search.toLowerCase());
    case 'string':
      return value.toLowerCase().includes(search.toLowerCase());
    default:
      return false;
  }
}
