import { Button } from '@/components';
import {
  FullScreenProvider,
  useFullscreen,
} from '@/components/context/FullscreenContext';

export default {
  title: 'Components / Button',
};

export function Basic() {
  return <Button>Hello, World!</Button>;
}
export function Fullscreen() {
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
      <Button onClick={toggle}>Click to toggle fullscreen</Button>
    </div>
  );
}
