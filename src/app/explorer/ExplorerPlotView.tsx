import { match } from 'ts-pattern';

import { useAppView } from '../../app-data/index.js';
import { assertNotNull } from '../../components/index.js';
import { IvPlotView, MassPlotView } from '../index.js';

import MeasurementExplorerWithState from './MeasurementExplorerWithState.js';

export function ExplorerPlotView() {
  const appView = useAppView();
  const selectedKind = appView.selectedKind;
  assertNotNull(selectedKind);
  return match(selectedKind)
    .with('mass', () => <MassPlotView />)
    .with('iv', () => <IvPlotView />)
    .otherwise(() => <MeasurementExplorerWithState />);
}
