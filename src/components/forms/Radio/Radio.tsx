/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { ReactNode } from 'react';

import { ButtonRadioItem } from './ButtonRadioItem';
import { ClassicRadioItem } from './ClassicRadioItem';

export interface ValueLabel {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}
export interface RadioProps {
  selected?: ValueLabel;
  type?: 'classic' | 'button';
  options?: ValueLabel[];
  onSelect?: (option: ValueLabel) => void;
  name?: string;
}
const rootStyles = {
  basic: css({
    display: 'flex',
    flexDirection: 'row',
    width: 'fit-content',
  }),
  button: css({
    ' & > * ': {
      borderWidth: '1px 0.5px 1px 0.5px',
    },
    ' & > *:first-of-type': {
      borderLeftWidth: 1,
      borderRadius: '8px 0 0 8px',
    },
    ' & > *:last-of-type': {
      borderRightWidth: 1,
      borderRadius: '0 8px 8px 0',
    },

    ' & > *:first-of-type span': {
      borderRadius: '8px 0 0 8px',
    },

    ' & > *:last-of-type span': {
      borderRadius: '0 8px 8px 0',
    },
  }),
};
export function Radio(props: RadioProps) {
  const { selected, type = 'classic', options, onSelect, name } = props;
  return (
    <RadioGroup.Root
      css={[rootStyles.basic, type === 'classic' ? null : rootStyles.button]}
      style={{
        gap: type === 'classic' ? 10 : 0,
      }}
      value={selected?.value}
      name={name}
    >
      {options?.map((option) =>
        type === 'classic' ? (
          <ClassicRadioItem
            key={option.value}
            {...option}
            onSelect={onSelect}
          />
        ) : (
          <ButtonRadioItem key={option.value} {...option} onSelect={onSelect} />
        ),
      )}
    </RadioGroup.Root>
  );
}
