import { Toolbar } from '../toolbar/index.js';

import { useFullscreen } from './fullscreen_context.js';

export function FullscreenToolbarButton() {
  const { toggle } = useFullscreen();
  return (
    <Toolbar.Item icon="fullscreen" tooltip="Full screen" onClick={toggle} />
  );
}
