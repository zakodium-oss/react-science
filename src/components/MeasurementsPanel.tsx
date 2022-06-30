import { useState } from 'react';

import { ValueRenderers } from '..';

import { Table } from './Table';
import { TabItem, Tabs } from './Tabs';
import {
  DataState,
  kindsLabel,
  MeasurementKind,
} from './context/data/DataState';

export interface MeasurementsPanelProps extends DataState {
  /**
   * Callback when change tab
   */
  onClick?: (item: TabItem) => void;
}
export function MeasurementsPanel(props: MeasurementsPanelProps) {
  const { onClick, measurements } = props;
  const items: Array<TabItem> = (Object.keys(kindsLabel) as MeasurementKind[])
    .filter((label) => measurements[label]?.entries?.length > 0)
    .map((label) => ({
      id: label,
      title: kindsLabel[label],
      content: (
        <Table>
          {measurements[label].entries.map(({ id, title }) => (
            <Table.Row key={id}>
              <ValueRenderers.Title value={id} />
              <ValueRenderers.Title value={title} />
            </Table.Row>
          ))}
        </Table>
      ),
    }));
  const [state, setState] = useState(items[0]);

  function handleClick(item: TabItem) {
    setState(item);
    onClick?.(item);
  }
  return items.length > 0 ? (
    <Tabs
      orientation="horizontal"
      items={items}
      opened={state}
      onClick={handleClick}
    />
  ) : (
    <div>No data available</div>
  );
}
