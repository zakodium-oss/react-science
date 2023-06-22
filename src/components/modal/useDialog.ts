import {
  MouseEventHandler,
  ReactEventHandler,
  RefObject,
  useCallback,
  useEffect,
} from 'react';
import { useKbsDisableGlobal } from 'react-kbs';

export function useDialog({
  dialogRef,
  isOpen,
  requestCloseOnEsc,
  requestCloseOnBackdrop,
  onRequestClose,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  isOpen: boolean;
  requestCloseOnEsc: boolean;
  requestCloseOnBackdrop: boolean;
  onRequestClose?: () => void;
}) {
  useKbsDisableGlobal(isOpen);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && isOpen) {
      dialog.showModal();
      return () => dialog.close();
    }
  }, [dialogRef, isOpen]);

  const onCancel = useCallback<ReactEventHandler<HTMLDialogElement>>(
    (event) => {
      event.preventDefault();
      if (requestCloseOnEsc && onRequestClose) {
        onRequestClose();
      }
    },
    [onRequestClose, requestCloseOnEsc],
  );

  const onClick = useCallback<MouseEventHandler<HTMLDialogElement>>(
    (event) => {
      event.stopPropagation();
      // Since the dialog has no size of itself, this condition is only
      // `true` when we click on the backdrop.
      if (event.target === event.currentTarget && requestCloseOnBackdrop) {
        onRequestClose?.();
      }
    },
    [requestCloseOnBackdrop, onRequestClose],
  );

  return { onClick, onCancel };
}
