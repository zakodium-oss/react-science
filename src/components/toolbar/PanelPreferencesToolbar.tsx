/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

import { Button } from '../button/Button';

interface PanelPreferencesToolbarProps {
  children?: ReactNode;
  onClose?: () => void;
  onSave?: () => void;
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  toolbar: css({
    display: 'flex',
    flexDirection: 'row-reverse',
    fontSize: 16,
  }),
};

export function PanelPreferencesToolbar(props: PanelPreferencesToolbarProps) {
  const { children, onClose, onSave } = props;
  return (
    <div css={styles.container}>
      <div css={styles.toolbar}>
        <Button
          onClick={onClose}
          color={{ basic: '#ca0000', hover: '#ca0000' }}
          backgroundColor={{ basic: 'white', hover: 'white' }}
        >
          <FaTimes />
        </Button>
        <Button
          onClick={onSave}
          color={{ basic: 'green', hover: 'green' }}
          backgroundColor={{ basic: 'white', hover: 'white' }}
        >
          <FaCheck />
        </Button>
      </div>
      <div>{children}</div>
    </div>
  );
}
