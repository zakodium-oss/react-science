import { useState } from 'react';

import { ValueRenderers } from '..';

import { Table } from './Table';
import { TabItem, Tabs } from './Tabs';
import {
  DataState,
  kindsLabel,
  MeasurementKind,
} from './context/data/DataState';
import { MeasurementBase } from './context/data/MeasurementBase';

interface PanelInfo {
  id: number;
  kinds: Partial<Record<MeasurementKind, MeasurementBase>>;
}
export interface MeasurementsPanelProps extends DataState {
  /**
   * Callback when change tab
   */
  onTabSelect?: (param: {
    kind: MeasurementKind;
    measurement: MeasurementBase;
  }) => void;
  /**
   * Callback when click on measurement
   */
  onMeasurementSelect?: (param: {
    kind: MeasurementKind;
    measurement: MeasurementBase;
  }) => void;
}
export function MeasurementsPanel(props: MeasurementsPanelProps) {
  const { onTabSelect, onMeasurementSelect, measurements } = props;

  const [{ id, kinds }, setInfo] = useState<PanelInfo>(() => {
    const kind = 'ir';
    const measurement = measurements[kind].entries[0];
    onTabSelect?.({ kind, measurement });
    onMeasurementSelect?.({ kind, measurement });
    return {
      id: 0,
      kinds: { [kind]: measurement },
    };
  });
  const kindItem = (kind: MeasurementKind) => ({
    id: kind,
    title: kindsLabel[kind],
    content: (
      <Table>
        {measurements[kind].entries.map((measurement) => (
          <Table.Row key={measurement.id}>
            <ValueRenderers.Title
              style={{
                padding: '0px 5px',
                backgroundColor: kinds[kind] === measurement ? 'green' : '',
                cursor: 'pointer',
              }}
              onClick={() => {
                setInfo(({ id, kinds }) => ({
                  id,
                  kinds: { ...kinds, [kind]: measurement },
                }));
                onMeasurementSelect?.({ kind, measurement });
              }}
              value={measurement.id}
            />
            <ValueRenderers.Text value={measurement.title} />
          </Table.Row>
        ))}
      </Table>
    ),
  });
  const availableKinds = (Object.keys(kindsLabel) as MeasurementKind[]).filter(
    (label) => measurements[label]?.entries?.length > 0,
  );
  const items: Array<TabItem> = availableKinds.map(kindItem);

  function handleClick(item: TabItem) {
    const kind = item.id as MeasurementKind;
    const measurement = kinds[kind] || measurements[kind].entries[0];
    setInfo(({ kinds }) => ({
      id: availableKinds.indexOf(kind),
      kinds: { ...kinds, [kind]: measurement },
    }));
    onTabSelect?.({ kind, measurement });
    onMeasurementSelect?.({ kind, measurement });
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
