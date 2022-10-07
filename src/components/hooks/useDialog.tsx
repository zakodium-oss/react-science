import React, { useCallback, useEffect, useRef } from 'react';

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
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    function onEsc(event: Event) {
      event.preventDefault();
      if (requestCloseOnEsc && onRequestClose) {
        onRequestClose();
      }
    }
    const dialog = ref.current;
    if (dialog) {
      dialog.addEventListener('cancel', onEsc);
      return () => dialog.removeEventListener('cancel', onEsc);
    }
  }, [onRequestClose, requestCloseOnEsc]);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && isOpen) {
      dialog.showModal();
      return () => dialog.close();
    }
  }, [isOpen]);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
      // Since the dialog has no size of itself, this condition is only
      // `true` when we click on the backdrop.
      if (event.target === event.currentTarget && requestCloseOnBackdrop) {
        onRequestClose?.();
      }
    },
    [requestCloseOnBackdrop, onRequestClose],
  );

  return { ref, onClick };
}
