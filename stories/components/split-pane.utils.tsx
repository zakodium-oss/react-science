import type { CSSProperties, ReactNode } from 'react';

export function SplitPanelChildContent(props: {
  color: CSSProperties['backgroundColor'];
  children: ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: props.color,
        width: '100%',
        height: '100%',
        display: 'grid',
        placeContent: 'center',
      }}
    >
      {props.children}
    </div>
  );
}
