import { Draft } from 'immer';

import { AppStateAction } from '../appStateActions';
import { AppState } from '../index';

export type ActionType = AppStateAction['type'];

export type AppStateProducer<T extends ActionType> = (
  draft: Draft<AppState>,
  action: Extract<AppStateAction, { type: T }>,
) => void;
