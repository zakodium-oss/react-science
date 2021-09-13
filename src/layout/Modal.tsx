import React, { ReactNode } from 'react';

interface ModalProps {
  title: string;
  children: ReactNode;
}

export function Modal(props: ModalProps) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '60%',
        height: '80%',
        margin: 'auto',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: '0.5rem',
        boxShadow: '0 0 0 0,0 8px 16px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          paddingTop: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {props.title}
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
}
