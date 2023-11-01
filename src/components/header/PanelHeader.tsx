/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode, useEffect, useRef } from 'react';
import { FaCog } from 'react-icons/fa';

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
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!labelRef.current) return;

    if (current !== undefined && total !== undefined) {
      labelRef.current.textContent = `${current} / ${total}`;
    } else if (current !== undefined) {
      labelRef.current.textContent = `[ ${current} ]`;
    } else if (total !== undefined) {
      labelRef.current.textContent = `[ ${total} ]`;
    }
  }, [current, total]);

  return (
    <div css={styles.container}>
      <div css={styles.leftContainer}>{children}</div>
      <p ref={labelRef} css={styles.counterLabel} />
      {onClickSettings && (
        <Button onClick={onClickSettings}>
          <FaCog />
        </Button>
      )}
    </div>
  );
}
