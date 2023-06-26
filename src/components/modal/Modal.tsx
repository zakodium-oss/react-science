import styled from '@emotion/styled';
import type { ReactElement, ReactNode } from 'react';

import ModalCloseButton from './ModalCloseButton';
import { useDialog } from './useDialog';

export interface ModalProps {
  children: ReactElement | Array<ReactElement>;
  isOpen: boolean;
  requestCloseOnEsc?: boolean;
  hasCloseButton?: boolean;
  requestCloseOnBackdrop?: boolean;
  onRequestClose?: () => void;
  maxWidth?: number;
  width?: number;
  height?: number;
}

const DialogRoot = styled.dialog`
  display: flex;
  position: fixed;
  background-color: transparent;

  ::backdrop {
    background-color: rgba(113, 113, 122, 0.75);
  }
`;

const DialogOpened = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  max-height: 90%;
  border-width: 1px;
  border-color: transparent;
  border-radius: 0.5rem;
  box-shadow: 0 0 0 0, 0 8px 16px rgba(0, 0, 0, 0.3);
`;

const ModalHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 10px 20px;
  border-bottom: 2px solid rgb(247, 247, 247);
`;

const ModalBodyStyled = styled.div`
  display: flex;
  flex: 1 1 0%;
  overflow-y: auto;
`;

const ModalFooterStyled = styled.div`
  border-top: 2px solid rgb(247, 247, 247);
  padding: 10px 20px 10px 20px;
`;

export function Modal(props: ModalProps) {
  const {
    isOpen,
    onRequestClose,
    hasCloseButton = true,
    requestCloseOnBackdrop = true,
    requestCloseOnEsc = true,
    children,
    width,
    maxWidth,
    height,
  } = props;

  const { ref, onClick } = useDialog({
    isOpen,
    requestCloseOnEsc,
    requestCloseOnBackdrop,
    onRequestClose,
  });

  return (
    <DialogRoot ref={ref} onClick={onClick}>
      {isOpen ? (
        <DialogOpened
          style={{
            maxWidth,
            height: height || 'max-content',
            width: width || '100%',
          }}
        >
          {children}
          {hasCloseButton && <ModalCloseButton onClick={onRequestClose} />}
        </DialogOpened>
      ) : null}
    </DialogRoot>
  );
}

Modal.Header = function ModalHeader(props: {
  children: ReactNode;
  position?: 'center' | 'start' | 'end';
}) {
  const { children, position = 'start' } = props;
  return (
    <ModalHeaderStyled style={{ justifyContent: position }}>
      {children}
    </ModalHeaderStyled>
  );
};

Modal.Body = function ModalBody(props: { children: ReactNode }) {
  return <ModalBodyStyled>{props.children}</ModalBodyStyled>;
};

Modal.Footer = function ModalFooter(props: { children: ReactNode }) {
  return <ModalFooterStyled>{props.children}</ModalFooterStyled>;
};
