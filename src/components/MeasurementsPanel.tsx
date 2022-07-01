import { useState } from 'react';

import { ValueRenderers } from '..';

import { Table } from './Table';
import { TabItem, Tabs } from './Tabs';
import {
  DataState,
  kindsLabel,
  MeasurementKind,
  MeasurementBase,
} from './context/data/DataState';

interface PanelInfo {
  id: number;
  kinds: Partial<Record<MeasurementKind, MeasurementBase>>;
}
export interface MeasurementsPanelProps extends DataState {
  /**
   * Callback when change tab
   */
  onTabSelect?: (kind: MeasurementKind, measurement: MeasurementBase) => void;
  /**
   * Callback when click on measurement
   */
  onMeasurementSelect?: (measurement: MeasurementBase) => void;
}
export function MeasurementsPanel(props: MeasurementsPanelProps) {
  const { onTabSelect, onMeasurementSelect, measurements } = props;

  const item = (kind: MeasurementKind) => ({
    id: kind,
    title: kindsLabel[kind],
    content: (
      <Table>
        {measurements[kind].entries.map((measurement) => (
          <Table.Row key={measurement.id}>
            <ValueRenderers.Title
              onClick={() => onMeasurementSelect?.(measurement)}
              value={measurement.id}
            />
            <ValueRenderers.Title
              onClick={() => onMeasurementSelect?.(measurement)}
              value={measurement.title}
            />
          </Table.Row>
        ))}
      </Table>
    ),
  });

  const items: Array<TabItem> = (Object.keys(kindsLabel) as MeasurementKind[])
    .filter((label) => measurements[label]?.entries?.length > 0)
    .map(item);

  const [{ id }, setInfo] = useState<PanelInfo>(() => {
    const kind = 'ir';
    const measurement = measurements[kind].entries[0];
    onTabSelect?.(kind, measurement);
    onMeasurementSelect?.(measurement);
    return {
      id: 0,
      kinds: {
        [kind]: measurement,
      },
    };
  });

  function handleClick(item: TabItem) {
    const kind = item.id as MeasurementKind;
    const measurement = measurements[kind].entries[0];
    setInfo(({ kinds }) => ({
      id: Object.keys(kindsLabel).indexOf(kind),
      kinds: { ...kinds, [kind]: measurement },
    }));
    onTabSelect?.(kind, measurement);
    onMeasurementSelect?.(measurement);
  }

  return items.length > 0 ? (
    <Tabs
      orientation="horizontal"
      items={items}
      opened={items[id]}
      onClick={handleClick}
    />
  ) : (
    <div>No data available</div>
  );
}
