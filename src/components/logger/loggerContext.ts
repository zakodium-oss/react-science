import type { FifoLogger } from 'fifo-logger';
import { createContext } from 'react';

export const fifoLoggerContext = createContext<FifoLogger | null>(null);
