/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaTimes } from 'react-icons/fa';

export default function ModalCloseButton(props: { onClick?: () => void }) {
  return (
    <div style={{ position: 'absolute', top: 4, right: 4 }}>
      <button
        type="button"
        style={{ padding: '10px 6px 10px 6px' }}
        onClick={props.onClick}
        css={css({
          color: 'rgba(239, 68, 68)',
          fontSize: 18,
          ':hover': { color: 'rgba(185, 28, 28)' },
        })}
      >
        <FaTimes />
      </button>
    </div>
  );
}
