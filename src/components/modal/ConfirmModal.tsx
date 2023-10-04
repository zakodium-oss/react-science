import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { useCallback, useImperativeHandle, useRef, useState } from 'react';

import { Button } from '..';
import { Portal } from '../root-layout/Portal';
import { RootLayoutProvider } from '../root-layout/RootLayoutContext';

import { useDialog } from './useDialog';

interface ConfirmModalProps {
  children: ReactNode;
  isOpen: boolean;
  requestCloseOnEsc?: boolean;
  requestCloseOnBackdrop?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  onRequestClose?: () => void;
  saveText?: string;
  cancelText?: string;
  headerColor: string;
  maxWidth?: number;
}

const ConfirmModalDialog = styled.dialog`
  background-color: transparent;
  :focus {
    outline: none;
  }
  ::backdrop {
    background-color: rgba(113, 113, 122, 0.75);
  }
`;

const ConfirmModalContents = styled.div<{
  headerColor: string;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  border-radius: 0.5rem;
  box-shadow:
    0 0 0 0,
    0 0px 16px rgba(0, 0, 0, 0.3);
  border-top: 10px solid ${({ headerColor }) => headerColor};
`;

const ConfirmModalChildrenRoot = styled.div<{ headerColor: string }>`
  color: ${({ headerColor }) => headerColor};
  display: flex;
  flex: 1 1 0%;
  font-weight: bold;
  padding: 20px;
  font-size: 14px;
`;

const ConfirmModalFooter = styled.div`
  border-top: 2px solid rgb(247, 247, 247);
  padding: 10px 20px 10px 20px;
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
`;

type MaybeHTMLDialogElement = HTMLDialogElement | null;

export function ConfirmModal(props: ConfirmModalProps) {
  const {
    isOpen,
    saveText = 'Save',
    cancelText = 'Cancel',
    headerColor,
    maxWidth,
    onRequestClose,
    onCancel = onRequestClose,
    onConfirm,
    requestCloseOnBackdrop = true,
    requestCloseOnEsc = true,
    children,
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
      <ConfirmModalDialog {...dialogProps} ref={dialogRef}>
        {isModalShown && (
          <RootLayoutProvider innerRef={portalDomNode}>
            <ConfirmModalContents
              headerColor={headerColor}
              style={{ maxWidth }}
            >
              <ConfirmModalChildrenRoot headerColor={headerColor}>
                {children}
              </ConfirmModalChildrenRoot>

              <ConfirmModalFooter>
                <Button
                  onClick={onConfirm}
                  backgroundColor={{
                    basic: 'hsla(243deg, 75%, 58%, 1)',
                    hover: 'hsla(245deg, 58%, 50%, 1)',
                  }}
                  color={{ basic: 'white' }}
                >
                  {saveText}
                </Button>
                <Button
                  onClick={onCancel}
                  backgroundColor={{
                    basic: 'hsla(0deg, 72%, 50%, 1)',
                    hover: 'hsla(0deg, 73%, 42%, 1)',
                  }}
                  color={{ basic: 'white' }}
                >
                  {cancelText}
                </Button>
              </ConfirmModalFooter>
            </ConfirmModalContents>
          </RootLayoutProvider>
        )}
      </ConfirmModalDialog>
    </Portal>
  );
}
