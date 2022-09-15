import { useState } from 'react';

import { ValueRenderers } from '..';
import { DataState, kindsLabel, MeasurementKind } from '../data/DataState';
import { MeasurementBase } from '../data/MeasurementBase';

import { Table } from './Table';
import { TabItem, Tabs } from './Tabs';

export interface MeasurementsPanelProps extends DataState {
  /**
   * Callback when click on measurement
   */
  onMeasurementSelect?: (param: {
    kind: MeasurementKind;
    measurement: MeasurementBase;
  }) => void;
  selectedMeasurement?: string;
}
export function MeasurementsPanel(props: MeasurementsPanelProps) {
  const { onMeasurementSelect, measurements } = props;

  const [selectedKind, setSelectedKind] = useState<MeasurementKind | undefined>(
    'ir',
  );

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
                backgroundColor:
                  props.selectedMeasurement === measurement.id ? 'green' : '',
                cursor: 'pointer',
              }}
              onClick={() => {
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
  const items: Array<TabItem<MeasurementKind>> = availableKinds.map(kindItem);

  function handleTabSelection(item: TabItem<MeasurementKind>) {
    setSelectedKind(item.id);
  }

  const openedItem = items.find((item) => item.id === selectedKind);

  return items.length > 0 ? (
    <Tabs<MeasurementKind>
      orientation="horizontal"
      items={items}
      opened={openedItem}
      onClick={handleTabSelection}
    />
  ) : (
    <div>No data available</div>
  );
}
