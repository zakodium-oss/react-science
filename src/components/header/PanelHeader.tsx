/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { FaCog } from 'react-icons/fa';

import { Button } from '../button/Button';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  leftContainer: css({
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  }),
  counterLabel: css({
    margin: 0,
    textAlign: 'right',
    lineHeight: '22px',
    padding: '0 10px',
    whiteSpace: 'nowrap',
  }),
};

interface PanelHeaderProps {
  count?: number;
  onClickSettings?: () => void;
  children?: ReactNode;
}

export function PanelHeader({
  count,
  children,
  onClickSettings,
}: PanelHeaderProps) {
  return (
    <div css={styles.container}>
      <div css={styles.leftContainer}>{children}</div>
      {count !== undefined && <p css={styles.counterLabel}>[ {count} ]</p>}
      {onClickSettings && (
        <Button
          onClick={onClickSettings}
          color={{ basic: 'black', hover: 'black' }}
          backgroundColor={{ basic: 'white', hover: 'white' }}
        >
          <FaCog />
        </Button>
      )}
    </div>
  );
}
