/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import {
  getCurrentMeasurementData,
  MeasurementBase,
  MeasurementKind,
  useAppDispatch,
  useAppState,
} from '../../../app-data/index';

export interface MeasurementsTableProps {
  kind: MeasurementKind;
}

interface MeasurementsTableRowProps {
  item: MeasurementBase;
  kind: MeasurementsTableProps['kind'];
}

const measurementsTableCss = {
  root: css`
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
  `,
  th: css`
    border-bottom-width: 1px;
    font-weight: 500;
    text-align: left;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 2rem;
  `,
  tbody: css`
    background-color: white;
  `,
  td: css`
    padding-left: 2rem;
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom-width: 1px;

    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
  `,
  tr: css`
    cursor: pointer;
  `,
};

export function MeasurementsTable(props: MeasurementsTableProps) {
  const { kind } = props;

  const {
    data: { measurements },
  } = useAppState();

  return (
    <table css={measurementsTableCss.root}>
      <MeasurementsTableHeader />
      <tbody css={measurementsTableCss.tbody}>
        {measurements[kind].entries.map((element) => (
          <MeasurementsTableRow key={element.id} item={element} kind={kind} />
        ))}
      </tbody>
    </table>
  );
}

function MeasurementsTableHeader() {
  return (
    <thead>
      <tr>
        <th css={measurementsTableCss.th} style={{ width: 150 }}>
          Id
        </th>
        <th css={measurementsTableCss.th}>Experiment</th>
      </tr>
    </thead>
  );
}

function MeasurementsTableRow(props: MeasurementsTableRowProps) {
  const { item, kind } = props;

  const appState = useAppState();
  const dispatch = useAppDispatch();

  const measurement = getCurrentMeasurementData(appState);
  const selectedMeasurement = measurement?.kindAndId;

  function onSelectRow() {
    dispatch({
      type: 'SELECT_MEASUREMENT',
      payload: { id: item.id, kind },
    });
  }

  return (
    <tr
      onClick={onSelectRow}
      css={measurementsTableCss.tr}
      style={{
        backgroundColor:
          selectedMeasurement?.id === item.id ? 'green' : 'white',
      }}
    >
      <td
        title={item.id}
        css={measurementsTableCss.td}
        style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {item.id}
      </td>
      <td css={measurementsTableCss.td}>{item.info.title}</td>
    </tr>
  );
}
