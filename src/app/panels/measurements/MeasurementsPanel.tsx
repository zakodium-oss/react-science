/** @jsxImportSource @emotion/react */
import { type PanelProps, Tab, Tabs } from '@blueprintjs/core';
import { css } from '@emotion/react';
import { useMemo } from 'react';

import {
  kindLabels,
  type MeasurementKind,
  measurementKinds,
  useAppDispatch,
  useAppState,
} from '../../../app-data/index.js';

import { MeasurementPanelProvider, MeasurementsTable } from './index.js';

// eslint-disable-next-line @typescript-eslint/unbound-method
export function MeasurementsPanel({ openPanel }: PanelProps<object>) {
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
  const measurementState = useMemo(
    () => ({
      openPanel,
    }),
    [openPanel],
  );

  if (items.length > 0) {
    return (
      <MeasurementPanelProvider value={measurementState}>
        <Tabs
          selectedTabId={view.selectedKind}
          onChange={handleTabSelection}
          css={css`
            div[role='tablist'] {
              overflow-x: auto;
              padding: 2px 0 0 1rem;
              border-bottom: 1px solid gray;
            }
            div[role='tabpanel'] {
              margin-top: 4px;
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
      </MeasurementPanelProvider>
    );
  }

  return (
    <div style={{ paddingTop: '1rem', marginInline: 'auto' }}>
      No data available
    </div>
  );
}
