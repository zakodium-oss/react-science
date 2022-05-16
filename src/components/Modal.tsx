import React, { ReactElement, ReactNode } from 'react';

import { Portal } from './Portal';
import { CloseButton } from './buttons/CloseButton';

export interface ModalProps {
  children: ReactElement | Array<ReactElement>;
  isOpen: boolean;
  maxWidth?: number;
  minHeight?: number;
}

export function Modal(props: ModalProps) {
  if (!props.isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        style={{
          backgroundColor: 'hsla(0deg, 0%, 97%, 0.8)',
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <div
        style={{
          maxHeight: '90%',
          maxWidth: props.maxWidth,
          minHeight: props.minHeight,
          backgroundColor: 'white',
          width: '60%',
          // height: 'max-content',
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {props.children}
      </div>
    </Portal>
  );
}

Modal.Header = function ModalHeader(props: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px 10px 20px',
        borderBottom: '2px solid rgb(247, 247, 247)',
      }}
    >
      {props.children}
      <CloseButton onClick={props.onClose} />
    </div>
  );
};

Modal.Body = function ModalBody(props: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flex: '1 1 0%', overflowY: 'auto' }}>
      {props.children}
    </div>
  );
};

Modal.Footer = function ModalFooter(props: { children: ReactNode }) {
  return (
    <div
      style={{
        borderTop: '2px solid rgb(247, 247, 247)',
        padding: '10px 20px 10px 20px',
      }}
    >
      {props.children}
    </div>
  );
};
