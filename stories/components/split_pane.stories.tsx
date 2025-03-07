import { action } from '@storybook/addon-actions';

import type { SplitPaneProps } from '../../src/components/index.js';
import { SplitPane } from '../../src/components/index.js';

import { SplitPanelChildContent } from './split_pane.utils.js';

export default {
  title: 'Components / SplitPane',
  tags: ['auotodocs'],
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
      <SplitPanelChildContent key="A" color="lightpink">
        A
      </SplitPanelChildContent>,
      <SplitPanelChildContent key="B" color="lightblue">
        B
      </SplitPanelChildContent>,
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
  defaultSize: '30%',
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
  defaultSize: '70%',
};

export function WithCloseThreshold(props: SplitPaneProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div>
        Resize the window until the close threshold is reached which will close
        the split pane.
        <br />
        Once you have interacted with the splitter (dragged or double clicked
        it), the close threshold is ignored.
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

WithCloseThreshold.args = {
  defaultSize: '500px',
  closeThreshold: 600,
};

export function ControlledProps(props: Omit<SplitPaneProps, 'defaultOpen'>) {
  return (
    <div>
      {`Use story controls to set the "open" and "size" states.`}
      <div style={{ height: 400, width: 600 }}>
        <SplitPane {...props} />
      </div>
    </div>
  );
}

ControlledProps.args = {
  open: true,
  size: '50%',
};
