/** @jsxImportSource @emotion/react */
import { RadioGroup, Radio, type RadioGroupProps } from '@blueprintjs/core';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import {
  RadioButtonGroup,
  type RadioButtonGroupProps,
  type RadioOption,
} from '../../src/components/index.js';

export default {
  title: 'Forms / Radio',
};

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2', disabled: true },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
];

const ExampleGroup = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export function ControlBlueprint(
  props: Omit<RadioGroupProps, 'onChange' | 'selectedValue' | 'children'>,
) {
  const [option, setOption] = useState(options[2]);
  return (
    <ExampleGroup>
      <RadioGroup
        onChange={(event) => {
          const value = event.currentTarget.value;
          setOption(
            (option) => options.find((o) => o.value === value) || option,
          );
        }}
        selectedValue={option.value}
        options={options}
        {...props}
      />
    </ExampleGroup>
  );
}
ControlBlueprint.args = {
  label: 'Radio Group label',
  disabled: false,
  inline: false,
};

const enabledColor = '#1677ff';

const storyStyles = {
  radioGroup: css({
    display: 'flex',
    flexDirection: 'row',
    width: 'fit-content',
    ' & > *:first-of-type, & > *:first-of-type span': {
      borderRadius: '6px 0 0 6px',
    },
    ' & > *:last-of-type, & > *:last-of-type span': {
      borderRightWidth: 1,
      borderRadius: '0 6px 6px 0',
    },
  }),
  radio: css({
    border: '1px solid hsla(0, 0%, 0%, 0.25)',
    borderRightWidth: 0,
    position: 'relative',
    paddingLeft: '0 !important',
    '.bp5-control-indicator': {
      display: 'none',
    },
    'input[type="radio"]:checked': {
      '& ~ div': {
        color: enabledColor,
      },
      '& ~ span': {
        border: `1px solid ${enabledColor} !important`,
      },
    },
    span: {
      position: 'absolute',
      top: -1,
      left: -1,
      right: -1,
      bottom: -1,
      zIndex: 10,
      borderWidth: '0 !important',
    },
  }),
  item: (disabled?: boolean) =>
    css({
      opacity: disabled ? 0.25 : 1,
      padding: '0px 15px',
      width: '100%',
      height: '100%',
      cursor: 'pointer',
      ':hover': {
        '& > label': {
          color: disabled ? '' : enabledColor,
        },
      },
      fontSize: '1.125em',
      lineHeight: '30px',
    }),
};

export function ButtonRadioBlueprint() {
  const [option, setOption] = useState(options[2]);
  return (
    <ExampleGroup>
      <RadioGroup
        onChange={(event) => {
          const value = event.currentTarget.value;
          setOption(
            (option) => options.find((o) => o.value === value) || option,
          );
        }}
        selectedValue={option.value}
        name="button-radio"
        css={storyStyles.radioGroup}
      >
        {options.map((o) => (
          <Radio
            name="button-radio"
            value={o.value}
            disabled={o.disabled}
            id={o.value}
            key={o.value}
            css={storyStyles.radio}
          >
            <div css={storyStyles.item(o.disabled)}>{o.label}</div>
            <span />
          </Radio>
        ))}
      </RadioGroup>
    </ExampleGroup>
  );
}

export function ControlButton(
  props: Omit<
    RadioButtonGroupProps,
    'options' | 'selected' | 'onSelect' | 'name'
  >,
) {
  const [option, setOption] = useState(options[2] as RadioOption);
  return (
    <ExampleGroup>
      <RadioButtonGroup
        options={options}
        selected={option}
        onSelect={setOption}
        {...props}
      />
    </ExampleGroup>
  );
}
ControlButton.args = {
  variant: 'default',
  disabled: false,
};

ControlButton.argTypes = {
  variant: {
    options: ['default', 'small'],
    control: { type: 'radio' },
  },
};
