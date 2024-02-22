/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode, useMemo } from 'react';

import { Button } from '../button/Button';

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
  counterLabel: css({
    margin: 0,
    textAlign: 'right',
    lineHeight: '22px',
    whiteSpace: 'nowrap',
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
  const counterLabel = useMemo(() => {
    if (current !== undefined && total !== undefined) {
      return `${current} / ${total}`;
    }
    if (current !== undefined) {
      return `[ ${current} ]`;
    }
    if (total !== undefined) {
      return `[ ${total} ]`;
    }
    return '';
  }, [current, total]);

  return (
    <div css={styles.container}>
      <div css={styles.leftContainer}>{children}</div>
      <p css={styles.counterLabel}>{counterLabel}</p>
      {onClickSettings && (
        <Button color="black" minimal onClick={onClickSettings} icon="cog" />
      )}
    </div>
  );
}
