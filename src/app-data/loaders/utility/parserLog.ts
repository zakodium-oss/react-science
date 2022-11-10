export interface ParserLog {
  kind: 'error' | 'warn' | 'info' | 'debug' | 'summary';
  parser: string;
  message: string;
  relativePath?: string;
  error?: Error;
}

export function createLogEntry(info: Partial<ParserLog>): ParserLog {
  const {
    parser = 'biologic-converter',
    kind = 'error',
    message = 'Error parsing biologic experiment.',
    error,
    relativePath,
  } = info;

  const log: ParserLog = {
    parser,
    kind,
    message,
  };

  if (error) {
    log.error = error;
  }
  if (relativePath) {
    log.relativePath = relativePath;
  }
  return log;
}
