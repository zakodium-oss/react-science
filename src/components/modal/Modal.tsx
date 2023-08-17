import styled from '@emotion/styled';
import type { ReactElement, ReactNode } from 'react';
import { useCallback, useImperativeHandle, useRef, useState } from 'react';

import { Portal } from '../root-layout/Portal';
import { RootLayoutProvider } from '../root-layout/RootLayoutContext';

import ModalCloseButton from './ModalCloseButton';
import { useDialog } from './useDialog';

export interface ModalProps {
  children: ReactElement | ReactElement[];
  isOpen: boolean;
  requestCloseOnEsc?: boolean;
  hasCloseButton?: boolean;
  requestCloseOnBackdrop?: boolean;
  onRequestClose?: () => void;
  maxWidth?: number;
  width?: number;
  height?: number;
}

const DialogRoot = styled.dialog`
  background-color: transparent;
  :focus {
    outline: none;
  }
  ::backdrop {
    background-color: rgba(113, 113, 122, 0.75);
  }
`;

const DialogContents = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-width: 1px;
  border-color: transparent;
  border-radius: 0.5rem;
  box-shadow:
    0 0 0 0,
    0 0px 16px rgba(0, 0, 0, 0.3);
`;

const ModalHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 10px 20px;
  border-bottom: 2px solid rgb(247, 247, 247);
`;

const ModalBodyStyled = styled.div`
  display: flex;
  flex: 1 1 0%;
  overflow-y: auto;
`;

const ModalFooterStyled = styled.div`
  border-top: 2px solid rgb(247, 247, 247);
  padding: 10px 20px 10px 20px;
`;

type MaybeHTMLDialogElement = HTMLDialogElement | null;

export function Modal(props: ModalProps) {
  const {
    isOpen,
    onRequestClose,
    hasCloseButton = true,
    requestCloseOnBackdrop = true,
    requestCloseOnEsc = true,
    children,
    width,
    maxWidth,
    height,
  } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const { dialogProps, isModalShown } = useDialog({
    dialogRef,
    isOpen,
    requestCloseOnEsc,
    requestCloseOnBackdrop,
    onRequestClose,
  });
  const [portalDomNode, setPortalDomNode] =
    useState<MaybeHTMLDialogElement>(null);
  const dialogCallbackRef = useCallback((node: MaybeHTMLDialogElement) => {
    setPortalDomNode(node);
  }, []);

  useImperativeHandle<MaybeHTMLDialogElement, MaybeHTMLDialogElement>(
    dialogCallbackRef,
    () => dialogRef.current,
  );

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <DialogRoot {...dialogProps} ref={dialogRef}>
        {isModalShown && (
          <RootLayoutProvider innerRef={portalDomNode}>
            <DialogContents
              style={{
                maxWidth,
                height: height || 'max-content',
                width: width || '100%',
              }}
            >
              {children}
              {hasCloseButton && <ModalCloseButton onClick={onRequestClose} />}
            </DialogContents>
          </RootLayoutProvider>
        )}
      </DialogRoot>
    </Portal>
  );
}

Modal.Header = function ModalHeader(props: { children: ReactNode }) {
  return <ModalHeaderStyled>{props.children}</ModalHeaderStyled>;
};

Modal.Body = function ModalBody(props: { children: ReactNode }) {
  return <ModalBodyStyled>{props.children}</ModalBodyStyled>;
};

Modal.Footer = function ModalFooter(props: { children: ReactNode }) {
  return <ModalFooterStyled>{props.children}</ModalFooterStyled>;
};
