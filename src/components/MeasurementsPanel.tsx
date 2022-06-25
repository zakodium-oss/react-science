import { useState } from 'react';

import { Table } from './Table';
import { TabItem, Tabs } from './Tabs';
import { Text } from './Text';
import { DataState, kindsLabel, kindLabelMap } from './context/data/DataState';

export interface MeasurementsPanelProps extends DataState {
  /**
   * Callback when change tab
   */
  onClick?: (item: TabItem) => void;
}
export function MeasurementsPanel(props: MeasurementsPanelProps) {
  const { onClick, measurements } = props;
  const items: Array<TabItem> = kindsLabel
    .filter((label) => measurements[label]?.entries?.length > 0)
    .map((label) => ({
      id: label,
      title: kindLabelMap[label],
      content: (
        <Table>
          {measurements[label].entries.map(({ id, title }) => (
            <Table.Row key={id}>
              <Text value={id} />
              <Text value={title} />
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
  return (
    <Tabs
      orientation="horizontal"
      items={items}
      opened={state}
      onClick={handleClick}
    />
  );
}
