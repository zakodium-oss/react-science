import type { CSSProperties, ReactNode } from 'react';

export function SplitPanelChildContent(props: {
  color: CSSProperties['backgroundColor'];
  children?: ReactNode;
}) {
  const { color, children = null } = props;
  return (
    <div
      style={{
        backgroundColor: color,
        width: '100%',
        height: '100%',
        display: 'grid',
        placeContent: 'center',
      }}
    >
      {children}
    </div>
  );
}
