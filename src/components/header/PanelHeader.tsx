/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';

import { Button } from '../button/Button';
import { SelectedTotal } from '../selected-total/SelectedTotal';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '0.55px solid rgb(240, 240, 240)',
  }),
  leftContainer: css({
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    '& > button': {
      padding: '0 5px',
      minWidth: 'auto',
    },
  }),
};

interface PanelHeaderProps {
  total?: number;
  current?: number;
  onClickSettings?: () => void;
  children?: ReactNode;
}

export function PanelHeader({
  total,
  current,
  children,
  onClickSettings,
}: PanelHeaderProps) {
  return (
    <div css={styles.container}>
      <div css={styles.leftContainer}>{children}</div>
      <SelectedTotal count={current} total={total} />
      {onClickSettings && (
        <Button color="black" minimal onClick={onClickSettings} icon="cog" />
      )}
    </div>
  );
}
