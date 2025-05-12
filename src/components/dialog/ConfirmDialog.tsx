import type { DialogProps } from '@blueprintjs/core';
import { Classes, Dialog, DialogBody, DialogFooter } from '@blueprintjs/core';
import styled from '@emotion/styled';

import { Button } from '../button/index.js';
import { shouldForwardPropExcept } from '../utils/shouldForwardPropExcept.js';

interface ConfirmDialogProps extends Omit<DialogProps, 'isCloseButtonShown'> {
  onConfirm: () => void;
  onCancel?: () => void;
  saveText?: string;
  cancelText?: string;
  headerColor: string;
}

const DialogWithHeaderColor = styled(Dialog, {
  shouldForwardProp: shouldForwardPropExcept(['headerColor']),
})<{ headerColor: string }>`
  .${Classes.DIALOG_HEADER} {
    background-color: ${(props) => props.headerColor};
    min-height: 0;
  }
`;

export function ConfirmDialog(props: ConfirmDialogProps) {
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
    <DialogWithHeaderColor
      headerColor={headerColor}
      onClose={onClose}
      {...otherProps}
      title=" "
      isCloseButtonShown={false}
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
    </DialogWithHeaderColor>
  );
}
