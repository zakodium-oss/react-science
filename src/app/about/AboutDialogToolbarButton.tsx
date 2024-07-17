import { Dialog, DialogBody } from '@blueprintjs/core';
import { IconName } from '@blueprintjs/icons';
import { type ReactElement, ReactNode } from 'react';

import { Toolbar, useOnOff } from '../../components';

interface AboutDialogToolbarButtonProps {
  name: string;
  icon: IconName | ReactElement;
  body: ReactNode;
}

export function AboutDialogToolbarButton(props: AboutDialogToolbarButtonProps) {
  const { name, icon, body } = props;
  const [isOpenDialog, openDialog, closeDialog] = useOnOff(false);

  return (
    <>
      <Toolbar.Item
        tooltip={`About ${name}`}
        onClick={openDialog}
        icon={icon}
      />
      <Dialog
        shouldReturnFocusOnClose={false}
        isOpen={isOpenDialog}
        onClose={closeDialog}
        title={name}
        icon="info-sign"
      >
        <DialogBody>{body}</DialogBody>
      </Dialog>
    </>
  );
}
