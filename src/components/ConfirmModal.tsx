import React, { ReactNode } from 'react';

import { Button } from '..';

interface ConfirmModalProps {
  children: ReactNode;
  isOpen: boolean;

  onConfirm: () => void;
  onCancel: () => void;

  saveText?: string;
  cancelText?: string;

  headerColor: string;
}

export function ConfirmModal(props: ConfirmModalProps) {
  const { saveText = 'Save', cancelText = 'Cancel', headerColor } = props;

  if (!props.isOpen) {
    return null;
  }

  return (
    <>
      <div
        style={{
          backgroundColor: 'hsla(0deg, 0%, 97%, 0.8)',
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <div
        style={{
          backgroundColor: 'white',
          width: '40%',
          height: 'max-content',
          margin: 'auto',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'absolute',
          borderWidth: 1,
          borderColor: 'transparent',
          borderRadius: '0.5rem',
          boxShadow: '0 0 0 0,0 8px 16px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderTop: `10px solid ${headerColor}`,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ color: headerColor }}>{props.children}</div>

          <div
            style={{
              borderTop: '2px solid rgb(247, 247, 247)',
              padding: '10px 20px 10px 20px',
              display: 'flex',
              flexDirection: 'row-reverse',
              gap: 10,
            }}
          >
            <Button
              onClick={props.onConfirm}
              backgroundColor={{
                basic: 'hsla(243deg, 75%, 58%, 1)',
                hover: 'hsla(245deg, 58%, 50%, 1)',
              }}
              color={{ basic: 'white', hover: 'white' }}
            >
              {saveText}
            </Button>
            <Button
              onClick={props.onCancel}
              backgroundColor={{
                basic: 'hsla(0deg, 72%, 50%, 1)',
                hover: 'hsla(0deg, 73%, 42%, 1)',
              }}
              color={{ basic: 'white', hover: 'white' }}
            >
              {cancelText}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
