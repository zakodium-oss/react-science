import type { FifoLogger } from 'fifo-logger';
import { createContext } from 'react';

export const FifoLoggerContext = createContext<FifoLogger | null>(null);
