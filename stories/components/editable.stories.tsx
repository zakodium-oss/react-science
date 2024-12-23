import { Icon } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { InputHTMLAttributes } from 'react';
import { useCallback, useMemo, useState } from 'react';

import { createTableColumnHelper, Table } from '../../src/components/index.js';

export default {
  title: 'Components / EditableTableText',
};

const StyledIcon = styled(Icon)`
  display: none;
  margin-right: 5px;
`;

const StyledInput = styled.input`
  width: 100%;

  :focus,
  :hover {
    box-shadow: 0 0 1px 1px #595959;
  }
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  :focus,
  :hover > span {
    position: absolute;
    right: 0;
    display: block;
    color: #595959;
  }
`;

function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <InputContainer>
      <StyledInput {...props} />
      <StyledIcon icon="edit" />
    </InputContainer>
  );
}

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
          <Input
            defaultValue={getValue()}
            onBlur={(event) =>
              changeValue(index, 'label', event.currentTarget.value)
            }
          />
        ),
      }),
      helper.accessor('field', {
        header: 'Field',
        cell: ({ getValue, row: { index } }) => (
          <Input
            defaultValue={getValue()}
            onBlur={(event) =>
              changeValue(index, 'field', event.currentTarget.value)
            }
          />
        ),
      }),
      helper.accessor('format', {
        header: 'Format',
        cell: ({ getValue, row: { index } }) => (
          <Input
            defaultValue={getValue()}
            onBlur={(event) =>
              changeValue(index, 'format', event.currentTarget.value)
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
