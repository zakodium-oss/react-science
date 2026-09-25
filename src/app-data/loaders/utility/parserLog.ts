export interface ParserLog {
  kind: 'error' | 'warn' | 'info' | 'debug' | 'summary';
  /*
   * Name of the parser or converter.
   */
  parser: string;
  message: string;
  /*
   * If the parser has branches for text, binary, etc.
   */
  branch?: string;
  /*
   * From FileCollectionItem or other.
   */
  relativePath?: string;
  error?: Error;
}

export function createLogEntry(info: Partial<ParserLog>): ParserLog {
  const {
    parser = 'biologic-converter',
    branch,
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
  if (branch) {
    log.branch = branch;
  }
  return log;
}
