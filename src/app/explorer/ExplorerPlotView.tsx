import { useAppView } from '../../app-data/index';
import { assertNotNull } from '../../components/index';
import { IvPlotView, MassPlotView } from '../index';

import MeasurementExplorerWithState from './MeasurementExplorerWithState';

export function ExplorerPlotView() {
  const appView = useAppView();
  const selectedKind = appView.selectedKind;
  assertNotNull(selectedKind);
  switch (selectedKind) {
    case 'mass':
      return <MassPlotView />;
    case 'iv':
      return <IvPlotView />;
    default: {
      return <MeasurementExplorerWithState />;
    }
  }
}
