import { Toolbar } from '../src';
import LayoutManager, { Layout } from '../src/components/LayoutManager';

export default {
  title: 'Layout/LayoutManager',
};

const components = {
  BlueBackground,
  YellowBackground,
};

const layout: Layout = {
  layout: {
    id: 'hxulp',
    component: 'SplitPane',
    orientation: 'horizontal',
    children: [
      {
        id: 'ala44',
        size: 3, // this is the size of the left part based on 'flex'
        component: 'SplitPane',
        orientation: 'vertical',
        children: [
          {
            id: 'sdaf',
            component: VioletBackground,
          },
          {
            id: 'oroc',
            component: PinkBackground,
          },
        ],
      },
      {
        id: '8hyk',
        size: 1,
        component: 'Accordion',
        children: [
          {
            id: 'iuvv',
            component: 'BlueBackground',
            isOpen: true,
          },
          {
            id: '59qh',
            component: GreenBackground,
            isOpen: true,
          },
          {
            id: 'mt5q',
            component: 'YellowBackground',
            isOpen: false,
          },
        ],
      },
    ],
  },
};

function GreenBackground() {
  return (
    <div
      style={{ backgroundColor: 'green', width: '100%', minHeight: '5em' }}
    />
  );
}
function YellowBackground() {
  return (
    <div
      style={{ backgroundColor: 'yellow', width: '100%', minHeight: '5em' }}
    />
  );
}
function BlueBackground() {
  return (
    <div style={{ backgroundColor: 'blue', width: '100%', minHeight: '5em' }} />
  );
}
function VioletBackground() {
  return (
    <div
      style={{ backgroundColor: 'violet', width: '100%', minHeight: '5em' }}
    />
  );
}

function PinkBackground() {
  return (
    <div style={{ backgroundColor: 'pink', width: '100%', minHeight: '5em' }} />
  );
}

export function fromLayoutObject() {
  return (
    <>
      <Toolbar orientation="vertical">
        <Toolbar.Item id="A" title="A">
          A
        </Toolbar.Item>
      </Toolbar>
      <LayoutManager layout={layout} components={components} />
    </>
  );
}
