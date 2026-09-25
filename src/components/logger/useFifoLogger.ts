import { use, useEffect, useState } from 'react';

import { FifoLoggerContext } from './loggerContext.js';

export function useFifoLogger() {
  const fifoLogger = use(FifoLoggerContext);
  if (!fifoLogger) {
    throw new Error('useFifoLogger must be used within a FifoLoggerProvider');
  }
  return fifoLogger;
}

export function useFifoLogs() {
  const logger = useFifoLogger();
  const [logs, setLogs] = useState(logger.getLogs());
  useEffect(() => {
    function onChange() {
      setLogs(logger.getLogs());
    }
    logger.addEventListener('change', onChange);
    return () => logger.removeEventListener('change', onChange);
  }, [logger]);
  return logs;
}
