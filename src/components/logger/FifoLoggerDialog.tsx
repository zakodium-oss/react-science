/** @jsxImportSource @emotion/react */

import { Dialog, DialogBody, DialogFooter } from '@blueprintjs/core';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { LogEntry } from 'fifo-logger';
import { CSSProperties } from 'react';

import { Button, Table, useFifoLogger, ValueRenderers } from '../index';

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

export function FifoLoggerDialog(props: FifoLoggerDialogProps) {
  const logger = useFifoLogger();
  return (
    <Dialog
      shouldReturnFocusOnClose={false}
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Logs"
      icon="info-sign"
      css={css`
        min-width: 800px;
        min-height: 500px;
        max-height: 80vh;
        max-width: 1000px;
      `}
    >
      <DialogBody>
        <Table
          compact
          bordered
          css={css`
            width: 100%;
          `}
        >
          <Table.Header>
            <ValueRenderers.Header value="#" />
            <ValueRenderers.Header value="Time" />
            <ValueRenderers.Header value="Level" />
            <ValueRenderers.Header value="Message" />
          </Table.Header>
          {props.logs.map((logEntry, idx) => (
            <Table.Row
              key={logEntry.id}
              style={{
                backgroundColor: rowBackgroundColor[logEntry.levelLabel],
              }}
            >
              <ValueRenderers.Component>
                <RowIndexCell
                  pillColor={
                    idx >= props.unseen
                      ? 'transparent'
                      : rowBackgroundColor[logEntry.levelLabel]
                  }
                >
                  {String(idx + 1)}
                </RowIndexCell>
              </ValueRenderers.Component>
              <ValueRenderers.Text
                value={new Date(logEntry.time).toLocaleTimeString()}
              />
              <ValueRenderers.Text value={logEntry.levelLabel} />
              <ValueRenderers.Text value={logEntry.message} />
            </Table.Row>
          ))}
        </Table>
      </DialogBody>
      <DialogFooter
        actions={
          <ActionsFooter>
            <Button
              outlined
              intent="danger"
              icon="trash"
              text="Clear logs"
              onClick={() => logger.clear()}
            />
            <Button
              outlined
              intent="none"
              text="Close"
              onClick={props.onClose}
            />
          </ActionsFooter>
        }
      />
    </Dialog>
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
