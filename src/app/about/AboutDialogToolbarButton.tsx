import { IconName } from '@blueprintjs/icons';
import styled from '@emotion/styled';
import { JSX, ReactNode } from 'react';

import { Modal, Toolbar, useOnOff } from '../../components';

interface AboutDialogToolbarButtonProps {
  name: string;
  icon: IconName | JSX.Element;
  body: ReactNode;
}

const ModalBody = styled.div`
  max-width: 600px;
  padding: 10px;
`;

export function AboutDialogToolbarButton(props: AboutDialogToolbarButtonProps) {
  const { name, icon, body } = props;
  const [isOpenDialog, openDialog, closeDialog] = useOnOff(false);

  return (
    <>
      <Toolbar.Item title={`About ${name}`} onClick={openDialog} icon={icon} />
      <Modal isOpen={isOpenDialog} onRequestClose={closeDialog}>
        <Modal.Header>{name}</Modal.Header>
        <Modal.Body>
          <ModalBody>{body}</ModalBody>
        </Modal.Body>
      </Modal>
    </>
  );
}
