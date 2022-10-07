/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import type { ReactElement, ReactNode } from 'react';

import { useDialog } from '../hooks/useDialog';

import ModalCloseButton from './ModalCloseButton';

export interface ModalProps {
  children: ReactElement | Array<ReactElement>;
  isOpen: boolean;
  requestCloseOnEsc?: boolean;
  hasCloseButton?: boolean;
  requestCloseOnBackdrop?: boolean;
  onRequestClose?: () => void;
  maxWidth?: number;
  width?: number;
  height?: number;
}

export function Modal(props: ModalProps) {
  const {
    isOpen,
    onRequestClose,
    hasCloseButton = true,
    requestCloseOnBackdrop = true,
    requestCloseOnEsc = true,
    maxWidth,
    width,
    height,
    children,
  } = props;
  const { ref, onClick } = useDialog({
    isOpen,
    requestCloseOnEsc,
    requestCloseOnBackdrop,
    onRequestClose,
  });

  return (
    <dialog
      ref={ref}
      style={{
        display: 'flex',
        position: 'fixed',
        backgroundColor: 'transparent',
      }}
      css={css`
        ::backdrop: rgba(113, 113, 122, 0.75);
      `}
      onClick={onClick}
    >
      {isOpen ? (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            maxHeight: '90%',
            width: width || '100%',
            maxWidth: maxWidth || undefined,
            height: height || 'max-content',
            borderWidth: 1,
            borderColor: 'transparent',
            borderRadius: '0.5rem',
            boxShadow: '0 0 0 0,0 8px 16px rgba(0, 0, 0, 0.3)',
          }}
        >
          {children}
          {hasCloseButton && <ModalCloseButton onClick={onRequestClose} />}
        </div>
      ) : null}
    </dialog>
  );
}

Modal.Header = function ModalHeader(props: { children: ReactNode }) {
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
