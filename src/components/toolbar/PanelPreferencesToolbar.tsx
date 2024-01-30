/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Toolbar } from './Toolbar';

interface PanelPreferencesToolbarProps {
  title?: string;
  onClose?: () => void;
  onSave?: () => void;
}

const styles = {
  container: css({
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '0.55px solid rgb(240, 240, 240)',
  }),
  title: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 12,
    fontWeight: 500,
  }),
  toolbar: css({
    fontSize: 16,
    display: 'flex',
    flexDirection: 'row-reverse',
    '& > button': {
      padding: 0,
      paddingLeft: 9,
      minWidth: 'auto',
    },
  }),
};

export function PanelPreferencesToolbar(props: PanelPreferencesToolbarProps) {
  const { title = '', onClose, onSave } = props;
  return (
    <div css={styles.container}>
      <div css={styles.title}>{title}</div>
      <div css={styles.toolbar}>
        <Toolbar>
          <Toolbar.Item
            title="close"
            onClick={onClose}
            intent="danger"
            icon="cross"
            noTooltip
          />
          <Toolbar.Item
            title="save"
            onClick={onSave}
            intent="success"
            icon="tick"
            noTooltip
          />
        </Toolbar>
      </div>
    </div>
  );
}
