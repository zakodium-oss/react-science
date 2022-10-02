import { Button } from '@/components';
import { Fullscreen } from '@/components/Fullscreen';
import { useFullscreen } from '@/components/context/FullscreenContext';

export default {
  title: 'Components / Fullscreen',
};

export function Basic() {
  return (
    <Fullscreen>
      <Content />
    </Fullscreen>
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
