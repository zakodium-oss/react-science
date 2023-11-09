/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

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
      <Button minimal onClick={onClose} intent="danger" icon="cross" />
      <Button minimal onClick={onSave} intent="success" icon="tick" />
    </div>
  );
}
