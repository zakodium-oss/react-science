import styled from '@emotion/styled';

import { Button, ButtonGroup, ButtonProps } from '../../src/components/index';

export default {
  title: 'Components / Button',
};

const ButtonWrapper = styled.div`
  padding: 10px;
`;
export function Control(props: Omit<ButtonProps, 'children' | 'tooltipProps'>) {
  return (
    <ButtonWrapper>
      <Button {...props}>Hello, World!</Button>
    </ButtonWrapper>
  );
}
Control.args = {
  active: false,
  disabled: false,
  loading: false,
  minimal: false,
  fill: false,
  outlined: false,
  large: false,
  small: false,
  alignText: 'center',
  intent: 'none',
  icon: 'plus',
  rightIcon: 'minus',
};
Control.argTypes = {
  alignText: {
    control: { type: 'radio' },
    options: ['left', 'center', 'right'],
  },
  intent: {
    control: { type: 'radio' },
    options: ['none', 'primary', 'success', 'warning', 'danger'],
  },
  onClick: { action: 'onClick' },
};
export function Tooltip(tooltipProps: ButtonProps['tooltipProps']) {
  return (
    <ButtonWrapper>
      <Button tooltipProps={tooltipProps}>Hello, World!</Button>
    </ButtonWrapper>
  );
}
Tooltip.args = {
  content: 'Tooltip content',
  compact: false,
  intent: 'none',
  placement: 'right',
};
Tooltip.argTypes = {
  placement: {
    control: { type: 'radio' },
    options: ['auto', 'right', 'bottom'],
  },
  intent: {
    control: { type: 'radio' },
    options: ['none', 'primary', 'success', 'warning', 'danger'],
  },
};
export function TooltipOnDisabled(tooltipProps: ButtonProps['tooltipProps']) {
  return (
    <ButtonWrapper>
      <Button disabled tooltipProps={tooltipProps}>
        Hello, World!
      </Button>
    </ButtonWrapper>
  );
}
TooltipOnDisabled.args = Tooltip.args;
TooltipOnDisabled.argTypes = Tooltip.argTypes;

export function ButtonGroupBasic() {
  return (
    <ButtonGroup>
      <ButtonGroup.Button position="first" label="A" onClick={noop} />
      <ButtonGroup.Button position="last" label="B" onClick={noop} />
    </ButtonGroup>
  );
}

function noop() {
  // Do nothing
}
