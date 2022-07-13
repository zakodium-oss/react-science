import { Meta } from '@storybook/react';
import { FilterXYType } from 'ml-signal-processing';
import { useState } from 'react';

import { SignalProcessingPanel as SignalProcessingPanelComponent } from '../src';

export default {
  title: 'Layout/Panels/SignalProcessingPanel',
  component: SignalProcessingPanelComponent,
} as Meta;

export function SignalProcessingPanel() {
  const [filters, setFilters] = useState<FilterXYType[]>([]);
  return (
    <SignalProcessingPanelComponent filters={filters} onChange={setFilters} />
  );
}
