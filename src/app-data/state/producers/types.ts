import type { Draft } from 'immer';

import type { AppStateAction } from '../app_state.actions.js';
import type { AppState } from '../index.js';

export type ActionType = AppStateAction['type'];

export type AppStateProducer<T extends ActionType> = (
  draft: Draft<AppState>,
  action: Extract<AppStateAction, { type: T }>,
) => void;
