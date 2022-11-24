import {
  kindLabels,
  MeasurementKind,
  measurementKinds,
  useAppState,
  useAppDispatch,
} from '../../../app-data/index';
import { TabItem, Tabs } from '../../../components/index';

import { MeasurementsTable } from './MeasurementsTable';

export function MeasurementsPanel() {
  const appState = useAppState();
  const { data, view } = appState;

  const dispatch = useAppDispatch();

  const kindItem = (kind: MeasurementKind) => ({
    id: kind,
    title: kindLabels[kind],
    content: <MeasurementsTable kind={kind} />,
  });

  const availableKinds = measurementKinds.filter(
    (label) => data.measurements[label].entries.length > 0,
  );

  const items: Array<TabItem<MeasurementKind>> = availableKinds.map(kindItem);

  function handleTabSelection(id: MeasurementKind) {
    dispatch({
      type: 'SELECT_MEASUREMENT_KIND',
      payload: id,
    });
  }

  if (items.length > 1) {
    return (
      <Tabs<MeasurementKind>
        orientation="horizontal"
        items={items}
        opened={view.selectedKind}
        onClick={handleTabSelection}
      />
    );
  }

  if (items.length === 1 && items[0].content) {
    return <>{items[0].content}</>;
  }

  return (
    <div style={{ paddingTop: '1rem', marginInline: 'auto' }}>
      No data available
    </div>
  );
}
