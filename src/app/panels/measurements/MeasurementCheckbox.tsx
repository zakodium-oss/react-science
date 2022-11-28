/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useLayoutEffect, useRef } from 'react';

interface MeasurementCheckboxProps {
  checked: boolean;
  onSelectCheckbox: () => void;
  indeterminate?: boolean;
}

const checkboxCss = css`
  color: #6366f1;
  border-color: #d1d5db;
  border-radius: 0.25rem;
  width: 1rem;
  height: 1rem;
  border-width: 1px;
`;

export function MeasurementCheckbox(props: MeasurementCheckboxProps) {
  const { checked, onSelectCheckbox, indeterminate } = props;
  const ref = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (ref.current && indeterminate !== undefined) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      css={checkboxCss}
      type="checkbox"
      checked={checked}
      onChange={onSelectCheckbox}
      ref={ref}
    />
  );
}
