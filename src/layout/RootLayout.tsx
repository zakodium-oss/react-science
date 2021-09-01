import React, { ReactNode, CSSProperties } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

const style: CSSProperties = {
  width: '100%',
  height: '100%',
};

export function RootLayout(props: RootLayoutProps) {
  return <div style={style}>{props.children}</div>;
}
