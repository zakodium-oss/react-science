import { useState } from 'react';

import { Measurement, ValueRenderers } from '..';

import { Table } from './Table';

export interface MeasurementInfoPanelProps {
  measurement: Measurement;
}

export function MeasurementInfoPanel(props: MeasurementInfoPanelProps) {
  const {
    measurement: { meta, info },
  } = props;

  const [search, setSearch] = useState('');
  const metaRows = (search: string) =>
    Object.keys(meta).map((key) => {
      if (!key.toLowerCase().includes(search.toLowerCase())) return null;
      const value = meta[key];
      return (
        <Table.Row key={key}>
          <ValueRenderers.Text value={key} />
          {typeof value === 'number' ? (
            <ValueRenderers.Number value={value} />
          ) : (
            <ValueRenderers.Text value={value} />
          )}
        </Table.Row>
      );
    });
  const infoRows = (search: string) =>
    Object.keys(info).map((key) => {
      if (!key.toLowerCase().includes(search.toLowerCase())) return null;
      const value = info[key];
      return (
        <Table.Row key={key}>
          <ValueRenderers.Text value={key} />
          {typeof value === 'number' ? (
            <ValueRenderers.Number value={value} />
          ) : (
            <ValueRenderers.Text value={value} />
          )}
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
