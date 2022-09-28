import { ValueRenderers } from '../../components';
import { Table } from '../../components/Table';
import { TabItem, Tabs } from '../../components/Tabs';
import { DataState, kindsLabel, MeasurementKind } from '../data/DataState';
import type { MeasurementBase } from '../data/MeasurementBase';

export interface MeasurementsPanelProps extends DataState {
  /**
   * Callback when click on measurement
   */
  onMeasurementSelect?: (param: {
    kind: MeasurementKind;
    measurement: MeasurementBase;
  }) => void;
  /**
   * Callback when click on tab
   */
  onTabSelect?: (kind: MeasurementKind) => void;
  selectedMeasurement?: {
    id: string;
    kind: MeasurementKind;
  };
}
export function MeasurementsPanel(props: MeasurementsPanelProps) {
  const { onMeasurementSelect, measurements } = props;

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
                  props.selectedMeasurement?.id === measurement.id
                    ? 'green'
                    : '',
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
    props.onTabSelect?.(item.id);
  }

  const openedItem = items.find(
    (item) => item.id === props.selectedMeasurement?.kind,
  );

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
