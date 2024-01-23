import { ButtonProps, Dialog, DialogBody } from '@blueprintjs/core';
import { ReactNode } from 'react';

import { Toolbar, useOnOff } from '../../components';

interface AboutDialogToolbarButtonProps {
  name: string;
  icon: ButtonProps['icon'];
  body: ReactNode;
}

export function AboutDialogToolbarButton(props: AboutDialogToolbarButtonProps) {
  const { name, icon, body } = props;
  const [isOpenDialog, openDialog, closeDialog] = useOnOff(false);

  return (
    <>
      <Toolbar.Item title={`About ${name}`} onClick={openDialog} icon={icon} />
      <Dialog
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
