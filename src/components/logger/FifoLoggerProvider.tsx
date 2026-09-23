import type { FifoLogger } from 'fifo-logger';
import type { ReactNode } from 'react';

import { FifoLoggerContext } from './loggerContext.js';

export function FifoLoggerProvider(props: {
  logger: FifoLogger;
  children: ReactNode;
}) {
  return (
    <FifoLoggerContext value={props.logger}>{props.children}</FifoLoggerContext>
  );
}
