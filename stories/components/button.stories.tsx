import { ButtonGroup } from '@blueprintjs/core';
import styled from '@emotion/styled';

import type { ButtonProps } from '../../src/components/index.js';
import { Button } from '../../src/components/index.js';

export default {
  title: 'Components / Button',
};

const ButtonWrapper = styled.div`
  padding: 10px;
  flex-direction: column;
  align-items: start;
  display: flex;
  gap: 5px;
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
  variant: 'solid',
  fill: false,
  size: 'medium',
  alignText: 'center',
  intent: 'none',
  icon: 'plus',
  endIcon: 'minus',
};
Control.argTypes = {
  variant: {
    control: { type: 'radio' },
    options: ['solid', 'minimal', 'outlined'],
  },
  size: {
    control: { type: 'radio' },
    options: ['small', 'medium', 'large'],
  },
  alignText: {
    control: { type: 'radio' },
    options: ['start', 'center', 'end'],
  },
  intent: {
    control: { type: 'radio' },
    options: ['none', 'primary', 'success', 'warning', 'danger'],
  },
  onClick: { action: 'onClick' },
};

export function WithTag() {
  return (
    <ButtonWrapper>
      <Button tag="1" icon="person">
        Hello, World!
      </Button>
      <Button tag="14">Hello, World!</Button>
      <Button tag="Error !" icon="person">
        Hello, World!
      </Button>
      <Button tag="Error !">Hello, World!</Button>
      <Button tag="Error !" icon="person" />
      <Button tag="1" icon="person" />
    </ButtonWrapper>
  );
}

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

const ButtonGroupStyled = styled(ButtonGroup)`
  & > *:first-of-type {
    border-radius: 6px 0 0 6px;
  }

  & > *:last-of-type {
    border-right-width: 1px;
    border-radius: 0 6px 6px 0;
  }
`;

export function ButtonGroupBasic() {
  return (
    <ButtonWrapper>
      <ButtonGroupStyled>
        <Button tag="1" icon="database">
          A
        </Button>
        <Button icon="function">B</Button>
        <Button icon="settings">C</Button>
      </ButtonGroupStyled>
      <ButtonGroupStyled>
        <Button tag="1" icon="database" />
        <Button tag="2" icon="function" />
        <Button icon="settings" />
      </ButtonGroupStyled>
    </ButtonWrapper>
  );
}
