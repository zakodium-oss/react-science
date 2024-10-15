import { Intent } from '@blueprintjs/core';
import type { LogEntry } from 'fifo-logger';
import { useState } from 'react';

import { useOnOff } from '../hooks/index.js';
import { Toolbar } from '../toolbar/index.js';

import { FifoLoggerDialog } from './FifoLoggerDialog.js';
import { useFifoLogs } from './useFifoLogger.js';

export function FifoLoggerToolbarItem() {
  const [seen, setSeen] = useState(0);
  const [isOpen, open, close] = useOnOff(false);
  const logs = useFifoLogs();

  const unseen = logs.length - seen;
  return (
    <>
      <Toolbar.Item
        icon="bug"
        tooltip="Logs"
        onClick={open}
        tag={unseen > 0 ? unseen : undefined}
        tagProps={{
          intent: getIntent(logs),
          style: {
            pointerEvents: 'none',
          },
        }}
      />
      <FifoLoggerDialog
        isOpen={isOpen}
        unseen={unseen}
        onClose={() => {
          setSeen(logs.length);
          close();
        }}
        logs={logs}
      />
    </>
  );
}

function getIntent(logs: LogEntry[]): Intent {
  const maxLevel = Math.max(
    ...logs.map((log) => log.level),
  ) as LogEntry['level'];
  return intentMap[maxLevel || 0];
}

const intentMap: Record<LogEntry['level'], Intent> = {
  60: 'danger',
  50: 'danger',
  40: 'warning',
  30: 'success',
  20: 'none',
  10: 'none',
  0: 'none',
};
