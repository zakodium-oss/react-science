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
    ];
  }, [changeValue]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Table<TableData>
          data={state}
          columns={columns}
          estimatedRowHeight={() => 50}
        />
      </div>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
