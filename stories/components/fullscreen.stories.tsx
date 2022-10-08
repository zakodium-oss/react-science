import { Button } from '@/components';
import {
  FullScreenProvider,
  useFullscreen,
} from '@/components/context/FullscreenContext';

export default {
  title: 'Components / Fullscreen',
};

export function Basic() {
  return (
    <FullScreenProvider>
      <Content />
    </FullScreenProvider>
  );
}
function Content() {
  const { toggle } = useFullscreen();
  return (
    <div>
      Hello, World! <Button onClick={toggle}>Click to toggle</Button>
    </div>
  );
}
