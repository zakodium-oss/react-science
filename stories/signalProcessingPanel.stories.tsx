import { Meta } from '@storybook/react';
import { useState } from 'react';

import {
  Filter,
  SignalProcessingPanel,
  SignalProcessingPanelProps,
} from '../src';

export default {
  title: 'Layout/Panels/SignalProcessingPanel',
  component: SignalProcessingPanel,
  argTypes: {
    onChange: {
      action: 'Filters modified',
    },
  },
} as Meta;

export function Control({ onChange }: SignalProcessingPanelProps) {
  const [filters, setFilters] = useState<Filter[]>([]);
  return (
    <SignalProcessingPanel
      filters={filters}
      onChange={(val) => {
        onChange(val);
        setFilters(val);
      }}
    />
  );
}
export function LoadFilters({ onChange }: SignalProcessingPanelProps) {
  const [filters, setFilters] = useState<Filter[]>([
    { name: 'centerMedian' },
    { name: 'fromTo', options: { from: 2, to: 8 } },
  ]);
  return (
    <SignalProcessingPanel
      filters={filters}
      onChange={(val) => {
        onChange(val);
        setFilters(val);
      }}
    />
  );
}
