import { Dialog, DialogBody, DialogFooter } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { LogEntry } from 'fifo-logger';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';

import { Button } from '../button/index.js';
import { createTableColumnHelper, Table } from '../table/index.js';

import { useFifoLogger } from './useFifoLogger.js';

const ActionsFooter = styled.div`
  display: flex;
  gap: 3px;
`;

interface RowIndexCellProps {
  pillColor: CSSProperties['backgroundColor'];
}

const RowIndexCell = styled.div<RowIndexCellProps>`
  ::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 5px;
    border-radius: 7px;
    filter: brightness(60%);
    background-color: ${({ pillColor }) => pillColor};
  }
`;

export interface FifoLoggerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  logs: LogEntry[];
  unseen: number;
}

const columnHelper = createTableColumnHelper<LogEntry>();
function useColumns(unseen: number) {
  return useMemo(
    () => [
      columnHelper.display({
        header: '#',
        cell: ({ row }) => {
          return (
            <RowIndexCell
              pillColor={
                row.index >= unseen
                  ? 'transparent'
                  : rowBackgroundColor[row.original.levelLabel]
              }
            >
              {String(row.index + 1)}
            </RowIndexCell>
          );
        },
      }),
      columnHelper.accessor('time', {
        header: 'Time',
        cell: ({ getValue }) => new Date(getValue()).toLocaleTimeString(),
      }),
      columnHelper.accessor('levelLabel', {
        header: 'Level',
      }),
      columnHelper.accessor('message', {
        header: 'Message',
      }),
    ],
    [unseen],
  );
}

const LoggerDialog = styled(Dialog)`
  min-width: 800px;
  min-height: 500px;
  max-height: 80vh;
  max-width: 1000px;
`;

export function FifoLoggerDialog(props: FifoLoggerDialogProps) {
  const logger = useFifoLogger();

  const columns = useColumns(props.unseen);

  return (
    <LoggerDialog
      shouldReturnFocusOnClose={false}
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Logs"
      icon="info-sign"
    >
      <DialogBody>
        <Table
          data={props.logs}
          columns={columns}
          compact
          bordered
          tableProps={{ style: { width: '100%' } }}
          renderRowTr={(trProps, row) => (
            <tr
              {...trProps}
              style={{
                backgroundColor: rowBackgroundColor[row.original.levelLabel],
              }}
            />
          )}
        />
      </DialogBody>
      <DialogFooter
        actions={
          <ActionsFooter>
            <Button
              variant="outlined"
              intent="danger"
              icon="trash"
              text="Clear logs"
              onClick={() => logger.clear()}
            />
            <Button
              variant="outlined"
              intent="none"
              text="Close"
              onClick={props.onClose}
            />
          </ActionsFooter>
        }
      />
    </LoggerDialog>
  );
}

// "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent"
const rowBackgroundColor: Record<string, CSSProperties['backgroundColor']> = {
  fatal: 'pink',
  error: 'pink',
  warn: 'lightyellow',
  info: 'lightgreen',
  debug: 'lightgrey',
  trace: 'lightgrey',
  silent: 'lightgrey',
};
