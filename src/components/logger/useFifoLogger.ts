import { useContext, useEffect, useState } from 'react';

import { fifoLoggerContext } from './loggerContext';

export default function useFifoLogger() {
  const fifoLogger = useContext(fifoLoggerContext);
  if (!fifoLogger) {
    throw new Error('useFifoLogger must be used within a FifoLoggerProvider');
  }
  return fifoLogger;
}

export function useFifoLogs() {
  const logger = useFifoLogger();
  const [logs, setLogs] = useState(logger.getLogs());
  useEffect(() => {
    logger.addEventListener('change', () => {
      setLogs(logger.getLogs());
    });
  }, [logger]);
  return logs;
}
