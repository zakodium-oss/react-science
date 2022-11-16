import {
  DataState,
  kindLabels,
  MeasurementKind,
  MeasurementBase,
  measurementKinds,
} from '../../app-data/index';
import { ValueRenderers, Table, TabItem, Tabs } from '../../components/index';

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
    id?: string;
    kind: MeasurementKind;
  };
}
export function MeasurementsPanel(props: MeasurementsPanelProps) {
  const { onMeasurementSelect, measurements, selectedMeasurement } = props;

  const kindItem = (kind: MeasurementKind) => ({
    id: kind,
    title: kindLabels[kind],
    content: (
      <Table>
        {measurements[kind].entries.map((measurement) => (
          <Table.Row key={measurement.id}>
            <ValueRenderers.Title
              style={{
                padding: '0px 5px',
                backgroundColor:
                  selectedMeasurement?.id === measurement.id ? 'green' : '',
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
  const availableKinds = measurementKinds.filter(
    (label) => measurements[label].entries.length > 0,
  );
  const items: Array<TabItem<MeasurementKind>> = availableKinds.map(kindItem);

  function handleTabSelection(item: TabItem<MeasurementKind>) {
    props.onTabSelect?.(item.id);
  }

  const openedItem = items.find(
    (item) => item.id === selectedMeasurement?.kind,
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
