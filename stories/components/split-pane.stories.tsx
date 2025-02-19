import { action } from '@storybook/addon-actions';
import type { CSSProperties, ReactNode } from 'react';

import type { SplitPaneProps } from '../../src/components/index.js';
import { SplitPane } from '../../src/components/index.js';

export default {
  title: 'Components / SplitPane',
  component: SplitPane,
  argTypes: {
    size: {
      control: { type: 'text' },
    },
    defaultSize: { control: { type: 'text' } },
  },
  args: {
    onOpenChange: action('onOpenChange'),
    onResize: action('onResize'),
    children: [
      <PanelChild key="A" color="lightpink">
        A
      </PanelChild>,
      <PanelChild key="B" color="lightblue">
        B
      </PanelChild>,
    ],
  },
};

export function Control(props: SplitPaneProps) {
  return (
    <div style={{ height: 400, width: 600 }}>
      <SplitPane {...props} />
    </div>
  );
}

export function Vertical(props: SplitPaneProps) {
  return (
    <div style={{ height: 400 }}>
      <SplitPane {...props} />
    </div>
  );
}

Vertical.args = {
  direction: 'vertical',
  defaultSize: '200px',
};

export function Horizontal(props: SplitPaneProps) {
  return (
    <div style={{ height: 200 }}>
      <SplitPane {...props} />
    </div>
  );
}

Horizontal.args = {
  direction: 'horizontal',
  defaultSize: '30%',
};

export function EndSideIsControlled(props: SplitPaneProps) {
  return (
    <div style={{ height: 400, width: 600 }}>
      <SplitPane {...props} />
    </div>
  );
}

EndSideIsControlled.args = {
  controlledSide: 'end',
  defaultSize: '80%',
};

export function WithMinimumSize(props: SplitPaneProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div>
        Resize the window to see how the minimum size affects the SplitPane.
      </div>
      <div
        style={{
          width: '100%',
          flex: 1,
          minHeight: 0,
        }}
      >
        <SplitPane {...props} />
      </div>
    </div>
  );
}

WithMinimumSize.args = {
  defaultSize: '500px',
  minimumSize: 600,
};

export function ControlledState(props: Omit<SplitPaneProps, 'defaultOpen'>) {
  return (
    <div>
      {`Use controls to set the "isOpen" and "size" state.`}
      <div style={{ height: 400, width: 600 }}>
        <SplitPane {...props} />
      </div>
    </div>
  );
}

ControlledState.args = {
  isOpen: true,
  size: '50%',
};

function PanelChild(props: {
  color: CSSProperties['backgroundColor'];
  children: ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: props.color,
        width: '100%',
        height: '100%',
        display: 'grid',
        placeContent: 'center',
      }}
    >
      {props.children}
    </div>
  );
}
