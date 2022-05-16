/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaTimes } from 'react-icons/fa';

interface CloseButtonProps {
  onClick?: () => void;
}

export function CloseButton(props: CloseButtonProps) {
  const { onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      css={css({
        color: 'rgba(239, 28, 28)',
        fontSize: 18,
        ':hover': { color: 'rgba(185, 28, 28)' },
      })}
    >
      <FaTimes />
    </button>
  );
}
