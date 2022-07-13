import { Meta } from '@storybook/react';
import { useState } from 'react';

import { Filter, SignalProcessingPanel } from '../src';

export default {
  title: 'Layout/Panels/SignalProcessingPanel',
  component: SignalProcessingPanel,
} as Meta;

export function Control() {
  const [filters, setFilters] = useState<Filter[]>([]);
  return <SignalProcessingPanel filters={filters} onChange={setFilters} />;
}
export function LoadFilters() {
  const [filters, setFilters] = useState<Filter[]>([
    { name: 'centerMedian' },
    { name: 'fromTo', options: { from: 2, to: 8 } },
  ]);
  return <SignalProcessingPanel filters={filters} onChange={setFilters} />;
}
