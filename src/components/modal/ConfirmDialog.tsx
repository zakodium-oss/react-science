/** @jsxImportSource @emotion/react */
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogProps,
} from '@blueprintjs/core';
import { css } from '@emotion/react';

import { Button } from '..';

interface ConfirmModalProps extends Omit<DialogProps, 'isCloseButtonShown'> {
  onConfirm: () => void;
  onCancel?: () => void;
  saveText?: string;
  cancelText?: string;
  headerColor: string;
}

export function ConfirmDialog(props: ConfirmModalProps) {
  const {
    saveText = 'Save',
    cancelText = 'Cancel',
    headerColor,
    onClose,
    onCancel = onClose,
    onConfirm,
    children,
    ...otherProps
  } = props;

  return (
    <Dialog
      onClose={onClose}
      {...otherProps}
      title=" "
      isCloseButtonShown={false}
      css={css`
        .bp5-dialog-header {
          background-color: ${headerColor};
          min-height: 0px;
        }
      `}
    >
      <DialogBody>{children}</DialogBody>
      <DialogFooter
        minimal
        actions={[
          <Button
            key="cancel"
            intent="danger"
            text={cancelText}
            onClick={onCancel}
          />,
          <Button
            key="save"
            intent="primary"
            text={saveText}
            onClick={onConfirm}
          />,
        ]}
      />
    </Dialog>
  );
}
