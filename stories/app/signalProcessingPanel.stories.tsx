import { useState } from 'react';

import {
  Filter,
  SignalProcessingPanel,
  SignalProcessingPanelProps,
} from '@/app/components';

export default {
  title: 'Layout/Panels/SignalProcessingPanel',
  component: SignalProcessingPanel,
};

const actions = {
  onChange: {
    action: 'Filters modified',
  },
};

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

Control.argTypes = actions;
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
LoadFilters.argTypes = actions;
