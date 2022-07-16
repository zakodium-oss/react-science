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
} as Meta<SignalProcessingPanelProps>;

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
export function LoadFilters({
  filters: InitialFilters,
  onChange,
}: SignalProcessingPanelProps) {
  const [filters, setFilters] = useState<Filter[]>(InitialFilters);
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
LoadFilters.args = {
  filters: [
    { name: 'centerMedian' },
    { name: 'fromTo', options: { from: 2, to: 8 } },
  ],
};
