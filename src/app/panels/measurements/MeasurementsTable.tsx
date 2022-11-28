/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import {
  MeasurementBase,
  MeasurementKind,
  useAppDispatch,
  useAppState,
} from '../../../app-data/index';

import { MeasurementCheckbox } from './MeasurementCheckbox';
import MeasurementColorPreview from './MeasurementColorPreview';
import MeasurementVisibilityToggle from './MeasurementVisibilityToggle';

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
  tr: css`
    height: 50px;
    max-height: 50px;
    overflow: hidden;
    cursor: pointer;
    padding-left: 2rem;
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom-width: 1px;

    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
  `,
  header: css`
    border-bottom-width: 1px;
    font-weight: 500;
    text-align: left;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 2rem;
  `,
  iconsContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;
    height: 50px;
    flex-direction: row;
    gap: 0.5rem;
    cursor: default;
  `,
};

export function MeasurementsTable(props: MeasurementsTableProps) {
  const { kind } = props;

  const {
    data: { measurements },
  } = useAppState();

  return (
    <table css={measurementsTableCss.root}>
      <MeasurementsTableHeader kind={kind} />
      <tbody css={measurementsTableCss.tbody}>
        {measurements[kind].entries.map((element) => (
          <MeasurementsTableRow key={element.id} item={element} kind={kind} />
        ))}
      </tbody>
    </table>
  );
}

function MeasurementsTableHeader(props: {
  kind: MeasurementsTableRowProps['kind'];
}) {
  const dispatch = useAppDispatch();

  const {
    data: { measurements },
    view: { selectedMeasurements },
  } = useAppState();

  const isChecked =
    selectedMeasurements[props.kind]?.length ===
    measurements[props.kind].entries.length;

  function onSelectCheckbox() {
    dispatch({
      type: 'SELECT_ALL_MEASUREMENTS',
      payload: {
        kind: props.kind,
        select: !isChecked,
      },
    });
  }

  return (
    <thead>
      <tr css={measurementsTableCss.header}>
        <th style={{ width: 70 }}>
          <MeasurementCheckbox
            checked={isChecked}
            onSelectCheckbox={onSelectCheckbox}
            indeterminate={
              !isChecked && (selectedMeasurements[props.kind] || []).length > 0
            }
          />
        </th>
        <th style={{ width: '60%' }}>Filename</th>
        <th style={{ width: 150 }}>Technique</th>
      </tr>
    </thead>
  );
}

function MeasurementsTableRow(props: MeasurementsTableRowProps) {
  const { item, kind } = props;

  const {
    view: { selectedMeasurements, measurements },
  } = useAppState();

  const dispatch = useAppDispatch();

  function onSelectRow() {
    dispatch({
      type: 'SELECT_MEASUREMENT',
      payload: { id: item.id, kind, acc: 'replace' },
    });
  }

  function onSelectCheckbox() {
    const isAlreadyChecked = selectedMeasurements[kind]?.includes(item.id);

    dispatch({
      type: 'SELECT_MEASUREMENT',
      payload: { id: item.id, kind, acc: isAlreadyChecked ? 'remove' : 'add' },
    });
  }

  return (
    <tr css={measurementsTableCss.tr}>
      <td css={measurementsTableCss.iconsContainer}>
        <MeasurementVisibilityToggle
          id={item.id}
          isVisible={measurements[item.id].visible}
        />
        <MeasurementColorPreview color={measurements[item.id].color} />
        <MeasurementCheckbox
          checked={selectedMeasurements[kind]?.includes(item.id) || false}
          onSelectCheckbox={onSelectCheckbox}
        />
      </td>
      <td
        onClick={onSelectRow}
        style={{ width: '60%', overflow: 'hidden' }}
        title={item.id}
      >
        {item.info.file?.name ?? item.info.title}
      </td>
      <td onClick={onSelectRow}>{item.meta.technique}</td>
    </tr>
  );
}
