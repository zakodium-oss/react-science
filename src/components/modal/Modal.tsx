import styled from '@emotion/styled';
import type { CSSProperties, ReactElement, ReactNode } from 'react';

import { Portal } from '../root-layout/Portal';

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
  background-color: transparent;

  ::backdrop {
    background-color: rgba(113, 113, 122, 0.75);
  }
`;

const DialogContents = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-width: 1px;
  border-color: transparent;
  border-radius: 0.5rem;
  box-shadow: 0 0 0 0, 0 0px 16px rgba(0, 0, 0, 0.3);
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

  const dialogProps = useDialog({
    isOpen,
    requestCloseOnEsc,
    requestCloseOnBackdrop,
    onRequestClose,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <DialogRoot {...dialogProps}>
        <DialogContents
          style={{
            maxWidth,
            height: height || 'max-content',
            width: width || '100%',
          }}
        >
          {children}
          {hasCloseButton && <ModalCloseButton onClick={onRequestClose} />}
        </DialogContents>
      </DialogRoot>
    </Portal>
  );
}

Modal.Header = function ModalHeader({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <ModalHeaderStyled style={style} className={className}>
      {children}
    </ModalHeaderStyled>
  );
};

Modal.Body = function ModalBody({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <ModalBodyStyled style={style} className={className}>
      {children}
    </ModalBodyStyled>
  );
};

Modal.Footer = function ModalFooter({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <ModalFooterStyled style={style} className={className}>
      {children}
    </ModalFooterStyled>
  );
};
