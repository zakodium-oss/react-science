/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';

import { Modal, Toolbar, useOnOff } from '../../components/index';

interface AboutDialogToolbarButtonProps {
  name: string;
  icon: ReactNode;
  body: ReactNode;
}

const aboutDialogToolbarButtonCss = {
  root: css`
    max-width: 600px;
    padding: 10px;
  `,
};

export function AboutDialogToolbarButton(props: AboutDialogToolbarButtonProps) {
  const { name, icon, body } = props;
  const [isOpenDialog, openDialog, closeDialog] = useOnOff(false);

  return (
    <>
      <Toolbar.Item
        titleOrientation="horizontal"
        title={`About ${name}`}
        onClick={openDialog}
      >
        {icon}
      </Toolbar.Item>
      <Modal isOpen={isOpenDialog} onRequestClose={closeDialog}>
        <Modal.Header>{name}</Modal.Header>
        <Modal.Body>
          <div css={aboutDialogToolbarButtonCss.root}>{body}</div>
        </Modal.Body>
      </Modal>
    </>
  );
}
