import { assertNotNullish } from '@zakodium/utils';
import { match } from 'ts-pattern';

import { useAppView } from '../../app-data/index.js';
import { IvPlotView, MassPlotView } from '../index.js';

import MeasurementExplorerWithState from './MeasurementExplorerWithState.js';

export function ExplorerPlotView() {
  const appView = useAppView();
  const selectedKind = appView.selectedKind;
  assertNotNullish(selectedKind);
  return match(selectedKind)
    .with('mass', () => <MassPlotView />)
    .with('iv', () => <IvPlotView />)
    .otherwise(() => <MeasurementExplorerWithState />);
}
