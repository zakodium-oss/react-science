import type { FifoLogger } from 'fifo-logger';
import { ReactNode } from 'react';

import { fifoLoggerContext } from './loggerContext';

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
