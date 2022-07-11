import { Meta } from '@storybook/react';
import { useState } from 'react';

import {
  Filter,
  SignalProcessingPanel as SignalProcessingPanelComponent,
} from '../src';

export default {
  title: 'Layout/Panels/SignalProcessingPanel',
  component: SignalProcessingPanelComponent,
} as Meta;

export function SignalProcessingPanel() {
  const [filters, setFilters] = useState<Filter[]>([]);
  return (
    <SignalProcessingPanelComponent filters={filters} onChange={setFilters} />
  );
}
