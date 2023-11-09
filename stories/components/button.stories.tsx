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
export function Tooltip(
  props: ButtonProps['tooltipProps'] & {
    buttonDisabled: boolean;
    onClick: ButtonProps['onClick'];
  },
) {
  const { buttonDisabled, onClick, ...tooltipProps } = props;
  return (
    <ButtonWrapper>
      <Button
        disabled={buttonDisabled}
        onClick={onClick}
        tooltipProps={tooltipProps}
      >
        Hello, World!
      </Button>
    </ButtonWrapper>
  );
}
Tooltip.args = {
  buttonDisabled: false,
  content: 'Tooltip content',
  compact: false,
  disabled: false,
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
  onOpening: { action: 'onOpening' },
  onClosing: { action: 'onClosing' },
  onClick: { action: 'onClick' },
};
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
