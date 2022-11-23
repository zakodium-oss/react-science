/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import {
  MeasurementBase,
  MeasurementKind,
  useAppDispatch,
  useAppState,
} from '../../../app-data/index';

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
    & {
      padding-left: 2rem;
      padding-bottom: 10px;
      padding-top: 10px;
      border-bottom-width: 1px;

      font-weight: 500;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  `,
  header: css`
    & {
      border-bottom-width: 1px;
      font-weight: 500;
      text-align: left;
      padding-bottom: 10px;
      padding-top: 10px;
      padding-left: 2rem;
    }
    & :first-child {
      width: 70px;
    }
    & :nth-child(2) {
      width: 150px;
    }
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
  checkbox: css`
    color: #6366f1;
    border-color: #d1d5db;
    border-radius: 0.25rem;
    width: 1rem;
    height: 1rem;
    border-width: 1px;
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
        <th>
          <MeasurementCheckbox
            checked={isChecked}
            onSelectCheckbox={onSelectCheckbox}
          />
        </th>
        <th style={{ width: '60%' }}>Id</th>
        <th>Experiment</th>
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
        {item.id}
      </td>
      <td onClick={onSelectRow}>{item.info.title}</td>
    </tr>
  );
}

interface MeasurementCheckboxProps {
  checked: boolean;
  onSelectCheckbox: () => void;
}

function MeasurementCheckbox(props: MeasurementCheckboxProps) {
  const { checked, onSelectCheckbox } = props;

  return (
    <input
      css={measurementsTableCss.checkbox}
      type="checkbox"
      checked={checked}
      onChange={onSelectCheckbox}
    />
  );
}
