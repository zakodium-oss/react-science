import type { Meta } from '@storybook/react-vite';
import { composeStory, setProjectAnnotations } from '@storybook/react-vite';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';

import preview from '../../.storybook/preview.js';

// Apply the same global decorators and styles as Storybook.
setProjectAnnotations(preview);

type StoryModule = Record<string, Parameters<typeof composeStory>[0]> & {
  default: Meta;
};

interface MountParams {
  story: string;
  props?: Record<string, unknown>;
}

const storyModules = import.meta.glob<StoryModule>(
  '../../stories/**/*.stories.tsx',
);

// Story ids are the story file path relative to the `stories` directory,
// without the `.stories.tsx` extension, followed by the exported story name.
// Example: `components/accordion/MixedItems`.
const storyFiles = new Map(
  Object.entries(storyModules).map(([path, load]) => [
    path.slice('../../stories/'.length, -'.stories.tsx'.length),
    load,
  ]),
);

async function loadStory(id: string) {
  const separator = id.lastIndexOf('/');
  const file = id.slice(0, separator);
  const name = id.slice(separator + 1);
  const load = storyFiles.get(file);
  if (!load) {
    throw new Error(`Story file not found for id "${id}"`);
  }
  const stories = await load();
  const story = stories[name];
  if (!story || name === 'default') {
    throw new Error(`Story "${name}" is not exported by "${file}.stories.tsx"`);
  }
  return composeStory(story, stories.default, undefined, name);
}

const container = document.querySelector('#root') as HTMLElement;
const state: { root?: Root } = {};

async function mount({ story, props = {} }: MountParams) {
  const Story = await loadStory(story);
  state.root ??= createRoot(container);
  state.root.render(<Story {...props} />);
}

function unmount() {
  state.root?.unmount();
  state.root = undefined;
}

Object.assign(globalThis, { mount, unmount });
