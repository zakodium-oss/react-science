/** @jsxImportSource @emotion/react */
import { Tab, Tabs } from '@blueprintjs/core';
import { css } from '@emotion/react';

import {
  kindLabels,
  MeasurementKind,
  measurementKinds,
  useAppState,
  useAppDispatch,
} from '../../../app-data/index';

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

  const items = availableKinds.map(kindItem);

  function handleTabSelection(id: MeasurementKind) {
    dispatch({
      type: 'SELECT_MEASUREMENT_KIND',
      payload: id,
    });
  }

  if (items.length > 1) {
    return (
      <Tabs
        selectedTabId={view.selectedKind}
        onChange={handleTabSelection}
        css={css`
          height: 100%;
          div[role='tablist'] {
            overflow-x: auto;
            padding: 0 1rem;
          }
        `}
      >
        {items.map((item) => (
          <Tab
            id={item.id}
            key={item.id}
            title={item.title}
            panel={item.content}
            tagContent={data.measurements[item.id].entries.length}
            tagProps={{ round: true }}
          />
        ))}
      </Tabs>
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
