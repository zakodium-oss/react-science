import {
  Button,
  FullScreenProvider,
  useFullscreen,
} from '../../src/components/index';

export default {
  title: 'Components / Fullscreen',
};
export function basic() {
  return (
    <div>
      <FullScreenProvider>
        <div
          style={{ border: 'solid 1px black', padding: '10px', margin: '10px' }}
        >
          Page 1
          <FullScreenProvider>
            <div
              style={{
                border: 'solid 1px red',
                padding: '10px',
                margin: '10px',
              }}
            >
              Page 2
              <FullScreenProvider>
                <div
                  style={{
                    border: 'solid 1px blue',
                    padding: '10px',
                    margin: '10px',
                  }}
                >
                  Page 3
                  <Content i="3" />
                </div>
              </FullScreenProvider>
              <Content i="2" />
            </div>
          </FullScreenProvider>
          <Content i="1" />
        </div>
      </FullScreenProvider>
    </div>
  );
}
function Content({ i }: { i: string }) {
  const { toggle } = useFullscreen();
  return (
    <div>
      <Button onClick={toggle}>Toggle fullscreen {i}</Button>
    </div>
  );
}
