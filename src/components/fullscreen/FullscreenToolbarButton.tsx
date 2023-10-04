import { Toolbar } from '../toolbar';

import { useFullscreen } from './FullscreenContext';

export function FullscreenToolbarButton() {
  const { toggle } = useFullscreen();
  return (
    <Toolbar.Item icon="fullscreen" title="Full screen" onClick={toggle} />
  );
}
