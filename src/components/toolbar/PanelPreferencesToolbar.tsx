/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaCheck, FaTimes } from 'react-icons/fa';

import { Button } from '../button/Button';

interface PanelPreferencesToolbarProps {
  onClose?: () => void;
  onSave?: () => void;
}

const styles = {
  toolbar: css({
    display: 'flex',
    flexDirection: 'row-reverse',
    fontSize: 16,
    padding: 3,
    '& > button': {
      padding: 0,
      paddingLeft: 9,
      minWidth: 'auto',
    },
  }),
};

export function PanelPreferencesToolbar(props: PanelPreferencesToolbarProps) {
  const { onClose, onSave } = props;
  return (
    <div css={styles.toolbar}>
      <Button onClick={onClose} intent="danger">
        <FaTimes />
      </Button>
      <Button onClick={onSave} intent="success">
        <FaCheck />
      </Button>
    </div>
  );
}
