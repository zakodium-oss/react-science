import type { FifoLogger } from 'fifo-logger';
import type { ReactNode } from 'react';

import { fifoLoggerContext } from './loggerContext.js';

export function FifoLoggerProvider(props: {
  logger: FifoLogger;
  children: ReactNode;
}) {
  return (
    <fifoLoggerContext.Provider value={props.logger}>
      {props.children}
    </fifoLoggerContext.Provider>
  );
}
