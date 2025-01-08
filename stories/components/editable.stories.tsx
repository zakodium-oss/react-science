import { Button } from '@blueprintjs/core';
import { useCallback, useMemo, useState } from 'react';

import { createTableColumnHelper, Table } from '../../src/components/index.js';
import {
  SwitchableInput,
  SwitchableInputRenderer,
} from '../../src/components/input/SwitchableInput.js';

export default {
  title: 'Components / EditableTableText',
};

interface TableData {
  id: number;
  label: string;
  field: string;
  format: string;
  visible: boolean;
}

const helper = createTableColumnHelper<TableData>();

const data: TableData[] = [
  { label: 'Name', field: 'info.name', format: '', visible: true },
  {
    label: 'Number of scans',
    field: 'info.numberOfScans',
    format: '0',
    visible: true,
  },
  {
    label: 'Pulse sequence',
    field: 'info.pulseSequence',
    format: '',
    visible: true,
  },
  {
    label: 'Frequency',
    field: 'meta..DIGITSERRE',
    format: '0',
    visible: false,
  },
].map((item, index) => ({ id: index, ...item }));

export function InsideTable() {
  const [state, setState] = useState(data);

  const deleteIndex = useCallback((index: number) => {
    return setState((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const changeValue = useCallback(
    (rowIndex: number, key: string, value: string) => {
      setState((prev) => {
        const element = prev.at(rowIndex);

        if (!element) {
          return prev;
        }

        return prev.map((item, index) => {
          if (index === rowIndex) {
            return { ...element, [key]: value };
          }

          return item;
        });
      });
    },
    [],
  );

  const addEmptyRow = useCallback(() => {
    setState((prev) => [
      ...prev,
      { id: prev.length, label: '', field: '', format: '', visible: true },
    ]);
  }, []);

  const columns = useMemo(() => {
    return [
      helper.accessor('id', { header: '#' }),
      helper.accessor('label', {
        header: 'Label',
        cell: ({ getValue, row: { index } }) => (
          <SwitchableInputRenderer
            value={getValue()}
            input={
              <SwitchableInput
                onBlur={(event) =>
                  changeValue(index, 'label', event.currentTarget.value)
                }
              />
            }
          />
        ),
      }),
      helper.accessor('field', {
        header: 'Field',
        cell: ({ getValue, row: { index } }) => (
          <SwitchableInputRenderer
            value={getValue()}
            input={
              <SwitchableInput
                onBlur={(event) =>
                  changeValue(index, 'field', event.currentTarget.value)
                }
              />
            }
          />
        ),
      }),
      helper.accessor('format', {
        header: 'Format',
        cell: ({ getValue, row: { index } }) => (
          <SwitchableInputRenderer
            value={getValue()}
            input={
              <SwitchableInput
                onBlur={(event) =>
                  changeValue(index, 'format', event.currentTarget.value)
                }
              />
            }
          />
        ),
      }),
      helper.accessor('visible', { header: 'Visible' }),
      helper.display({
        header: ' ',
        cell: ({ row: { index } }) => {
          return (
            <Button
              type="button"
              icon="trash"
              onClick={() => deleteIndex(index)}
            />
          );
        },
      }),
    ];
  }, [changeValue, deleteIndex]);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
      }}
    >
      <div>
        <Table<TableData>
          data={state}
          columns={columns}
          estimatedRowHeight={() => 50}
          renderFooterRow={() => (
            <Button style={{ width: '100%' }} onClick={addEmptyRow}>
              Add a row
            </Button>
          )}
        />
      </div>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export function Input() {
  return (
    <div style={{ backgroundColor: 'red' }}>
      <SwitchableInputRenderer value="hello" input={<SwitchableInput />} />
    </div>
  );
}
