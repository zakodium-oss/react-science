import {
  MouseEventHandler,
  ReactEventHandler,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useKbsDisableGlobal } from 'react-kbs';

export function useDialog({
  isOpen,
  requestCloseOnEsc,
  requestCloseOnBackdrop,
  onRequestClose,
}: {
  isOpen: boolean;
  requestCloseOnEsc: boolean;
  requestCloseOnBackdrop: boolean;
  onRequestClose?: () => void;
}) {
  useKbsDisableGlobal(isOpen);

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && isOpen) {
      dialog.showModal();
      return () => dialog.close();
    }
  }, [isOpen]);

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
      // Since the dialog has no size of itself, this condition is only
      // `true` when we click on the backdrop.
      if (event.target === event.currentTarget && requestCloseOnBackdrop) {
        onRequestClose?.();
      }
    },
    [requestCloseOnBackdrop, onRequestClose],
  );

  return { ref: dialogRef, onClick, onCancel };
}
