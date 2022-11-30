/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const styles = {
  input: css`
    box-sizing: border-box;
    margin: 0px;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 0px;
    background-color: #fff;
    border-radius: 6px;
    transition: all 0.2s;
    border: 1px solid #d9d9d9;
  `,
};

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input css={styles.input} {...props} />;
}
