import styled from '@emotion/styled';
import type { CSSProperties, ReactNode } from 'react';

import {
  Button,
  FullScreenProvider,
  useFullscreen,
} from '../../src/components/index.js';

export default {
  title: 'Components / Fullscreen',
};

export function Basic() {
  return (
    <FullScreenProvider
      onToggleError={(error, step) => {
        // eslint-disable-next-line no-console
        console.error(error, step);
        // eslint-disable-next-line no-alert
        window.alert(
          `Fullscreen error during "${step}". See the browser console for details.`,
        );
      }}
    >
      {(page1) => (
        <FullPageRoot ref={page1} color="green">
          <FullPageContent i="1">
            <FullScreenProvider>
              {(page2) => (
                <FullPageRoot ref={page2} color="red">
                  <FullPageContent i="2">
                    <FullScreenProvider>
                      {(page3) => (
                        <FullPageRoot color="blue" ref={page3}>
                          <FullPageContent i="3" />
                        </FullPageRoot>
                      )}
                    </FullScreenProvider>
                  </FullPageContent>
                </FullPageRoot>
              )}
            </FullScreenProvider>
          </FullPageContent>
        </FullPageRoot>
      )}
    </FullScreenProvider>
  );
}

const FullPageRoot = styled.div<{ color: CSSProperties['borderColor'] }>`
  border: 2px solid ${(props) => props.color};
`;

function FullPageContent({ i, children }: { i: string; children?: ReactNode }) {
  return (
    <FullPageInner>
      Page {i}
      {children}
      <Content i={i} />
    </FullPageInner>
  );
}

const FullPageInner = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

function Content({ i }: { i: string }) {
  const { toggle } = useFullscreen();
  return (
    <div>
      <Button onClick={toggle}>Toggle fullscreen {i}</Button>
    </div>
  );
}
