/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode, useEffect, useRef } from 'react';

import { Button } from '..';

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

export function ConfirmModal(props: ConfirmModalProps) {
  const {
    isOpen,
    saveText = 'Save',
    cancelText = 'Cancel',
    headerColor,
    maxWidth,
    onRequestClose,
    onCancel = props.onRequestClose,
    onConfirm,
    requestCloseOnBackdrop = true,
    requestCloseOnEsc = true,
  } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    function onEsc(event: Event) {
      event.preventDefault();
      if (requestCloseOnEsc && onRequestClose) {
        onRequestClose();
      }
    }
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.addEventListener('cancel', onEsc);
      return () => dialog.removeEventListener('cancel', onEsc);
    }
  }, [onRequestClose, requestCloseOnEsc]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && isOpen) {
      dialog.showModal();
      return () => dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      style={{
        display: 'flex',
        position: 'fixed',
        backgroundColor: 'transparent',
      }}
      css={css`
        ::backdrop: rgba(113, 113, 122, 0.75);
      `}
      onClick={(event) => {
        // Since the dialog has no size of itself, this condition is only
        // `true` when we click on the backdrop.
        if (event.target === event.currentTarget && requestCloseOnBackdrop) {
          onRequestClose?.();
        }
      }}
    >
      {isOpen ? (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            maxHeight: '90%',
            width: '100%',
            maxWidth: maxWidth || undefined,
            borderWidth: 1,
            borderColor: 'transparent',
            borderRadius: '0.5rem',
            boxShadow: '0 0 0 0,0 8px 16px rgba(0, 0, 0, 0.3)',
            borderTop: `10px solid ${headerColor}`,
          }}
        >
          <div style={{ color: headerColor, display: 'flex', flex: '1 1 0%' }}>
            {props.children}
          </div>

          <div
            style={{
              borderTop: '2px solid rgb(247, 247, 247)',
              padding: '10px 20px 10px 20px',
              display: 'flex',
              flexDirection: 'row-reverse',
              gap: 10,
            }}
          >
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
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
