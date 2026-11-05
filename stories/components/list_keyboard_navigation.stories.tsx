import { Classes, InputGroup } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { useState } from 'react';

import type { ListKeyboardScope } from '../../src/components/index.js';
import { useListKeyboardNavigation } from '../../src/components/index.js';

export default {
  title: 'Hooks / useListKeyboardNavigation',
};

const elements = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium',
  'Boron',
  'Carbon',
  'Nitrogen',
  'Oxygen',
  'Fluorine',
  'Neon',
  'Sodium',
  'Magnesium',
];

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const Lists = styled.div`
  display: flex;
  gap: 24px;
`;

const ListColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 220px;
`;

const Rows = styled.div`
  height: 180px;
  overflow-y: auto;
  border: 1px solid #d3d8de;
  border-radius: 4px;

  &:focus-visible {
    outline: 2px solid #2d72d2;
  }
`;

const Row = styled.div`
  padding: 4px 8px;
  cursor: pointer;

  &[data-selected='true'] {
    background-color: #2d72d2;
    color: white;
  }
`;

interface KeyboardListProps {
  title: string;
  scope: ListKeyboardScope;
}

function KeyboardList(props: KeyboardListProps) {
  const { title, scope } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useListKeyboardNavigation({
    count: elements.length,
    selectedIndex,
    onSelect: setSelectedIndex,
    scope,
  });

  return (
    <ListColumn>
      <strong>{title}</strong>
      <Rows ref={listRef}>
        {elements.map((element, index) => (
          <Row
            key={element}
            data-selected={index === selectedIndex}
            onClick={() => setSelectedIndex(index)}
          >
            {element}
          </Row>
        ))}
      </Rows>
      <span className={Classes.TEXT_MUTED}>
        Selected: {elements[selectedIndex]}
      </span>
    </ListColumn>
  );
}

export function TwoListsOnOnePage() {
  return (
    <Page>
      <p>
        Press ArrowUp / ArrowDown with nothing focused: only the
        &quot;document&quot; list moves. Click a row of the
        &quot;container&quot; list first: only that list moves. While the text
        field has the focus, neither list moves.
      </p>
      <Lists>
        <KeyboardList title="scope: 'container'" scope="container" />
        <KeyboardList title="scope: 'document'" scope="document" />
      </Lists>
      <InputGroup placeholder="Arrow keys typed here move no list" />
    </Page>
  );
}
