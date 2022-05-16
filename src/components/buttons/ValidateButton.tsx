/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaCheck } from 'react-icons/fa';

interface ValidateButtonProps {
  onClick?: () => void;
}

export function ValidateButton(props: ValidateButtonProps) {
  const { onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      css={css({
        color: 'green',
        fontSize: 16,
      })}
    >
      <FaCheck />
    </button>
  );
}
