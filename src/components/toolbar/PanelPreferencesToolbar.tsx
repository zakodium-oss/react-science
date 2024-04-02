/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Toolbar } from './Toolbar';

interface PanelPreferencesToolbarProps {
  title?: React.ReactNode;
  onClose?: () => void;
  onSave?: () => void;
}

const styles = {
  container: css({
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgb(240, 240, 240)',
  }),
  title: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 12,
    fontWeight: 500,
  }),
  toolbar: css({
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
          {onClose && (
            <Toolbar.Item
              hoverContent="close"
              onClick={onClose}
              intent="danger"
              icon="cross"
              noHoverContent
            />
          )}
          {onSave && (
            <Toolbar.Item
              hoverContent="save"
              onClick={onSave}
              intent="success"
              icon="tick"
              noHoverContent
            />
          )}
        </Toolbar>
      </div>
    </div>
  );
}
