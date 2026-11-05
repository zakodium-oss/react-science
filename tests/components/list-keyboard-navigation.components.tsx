import { useState } from 'react';

import type { ListKeyboardScope } from '../../src/components/index.js';
import { useListKeyboardNavigation } from '../../src/components/index.js';

const items = ['Alpha', 'Beta', 'Gamma', 'Delta'];

interface KeyboardListProps {
  name: string;
  scope: ListKeyboardScope;
}

function KeyboardList(props: KeyboardListProps) {
  const { name, scope } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useListKeyboardNavigation({
    count: items.length,
    selectedIndex,
    onSelect: setSelectedIndex,
    scope,
  });

  return (
    <div>
      <div ref={listRef} data-testid={`${name}-list`}>
        {items.map((item, index) => (
          <div
            key={item}
            data-selected={index === selectedIndex}
            onClick={() => setSelectedIndex(index)}
          >
            {`${name} ${item}`}
          </div>
        ))}
      </div>
      <output data-testid={`${name}-selected`}>{selectedIndex}</output>
    </div>
  );
}

export function TwoKeyboardLists() {
  return (
    <div>
      <h1>Two lists</h1>
      <KeyboardList name="container" scope="container" />
      <KeyboardList name="document" scope="document" />
      <input aria-label="Text field" />
    </div>
  );
}
