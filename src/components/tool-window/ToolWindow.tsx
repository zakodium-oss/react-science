import { IconName, MaybeElement } from '@blueprintjs/core';
import { useState } from 'react';

import { Accordion } from '../accordion/Accordion';
import { Button } from '../button/Button';

export interface ToolWindowPanel {
  id: string;
  renderPanel: () => JSX.Element;
  icon: IconName | MaybeElement;
  isOpen?: boolean;
}

interface ToolWindowProps {
  intialPanels: string[];
  panels: ToolWindowPanel[];
  activePanels?: string[];
  onPanelChange?: (id: string) => void;
}

export function ToolWindow(props: ToolWindowProps) {
  const {
    panels,
    intialPanels,
    onPanelChange,
    activePanels: activePanelsProp,
  } = props;
  const [activePanelsState, setActivePanels] = useState<string[]>(intialPanels);
  const activePanels =
    activePanelsProp !== undefined ? activePanelsProp : activePanelsState;
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
      }}
    >
      <div>
        {panels.map(({ icon, id }) => (
          <Button
            large
            fill
            key={id}
            icon={icon}
            onClick={() => {
              if (onPanelChange) {
                onPanelChange(id);
              }
              setActivePanels((prev) => {
                if (prev.includes(id)) {
                  return prev.filter((p) => p !== id);
                }
                return [...prev, id];
              });
            }}
          />
        ))}
      </div>
      <div
        style={{
          flex: 1,
        }}
      >
        <Accordion>
          {panels
            .filter(({ id }) => activePanels.includes(id))
            .map(({ renderPanel }) => renderPanel())}
        </Accordion>
      </div>
    </div>
  );
}
