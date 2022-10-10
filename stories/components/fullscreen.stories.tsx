import { Button, FullScreenProvider, useFullscreen } from '@/components';

export default {
  title: 'Components / Fullscreen',
};
export function basic() {
  return (
    <div>
      <FullScreenProvider>
        <Content i="1" />
      </FullScreenProvider>
      <FullScreenProvider>
        <Content i="2" />
      </FullScreenProvider>
    </div>
  );
}
function Content({ i }) {
  const { toggle } = useFullscreen();
  return (
    <div style={{ border: 'solid 1px black' }}>
      Page {i}
      <Button onClick={toggle}>Toggle fullscreen</Button>
    </div>
  );
}
