/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';

const styles = {
  root: css`
    display: inline-flex;
    border-radius: 0.375rem;
    isolation: isolate;
  `,
  firstButton: css`
    position: relative;
    display: inline-flex;
    align-items: center;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 5px;
    padding-bottom: 5px;
    border-width: 1px;
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
  `,
  secondButton: css`
    position: relative;
    display: inline-flex;
    align-items: center;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 5px;
    padding-bottom: 5px;
    border-width: 1px;
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
    margin-left: -1px;
  `,
};

interface ButtonGroupProps {
  children: [ReactNode, ReactNode];
}

export function ButtonGroup(props: ButtonGroupProps) {
  const { children } = props;
  return <div css={styles.root}>{children}</div>;
}

interface ButtonGroupButtonProps {
  position: 'first' | 'last';
  label: string;
  onClick: () => void;
}

ButtonGroup.Button = function ButtonGroupButton(props: ButtonGroupButtonProps) {
  const { position, label, onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      css={position === 'first' ? styles.firstButton : styles.secondButton}
    >
      {label}
    </button>
  );
};
