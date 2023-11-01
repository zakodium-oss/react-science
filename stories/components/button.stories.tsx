import { Button, ButtonGroup, ButtonProps } from '../../src/components/index';

export default {
  title: 'Components / Button',
};

export function Control(props: Omit<ButtonProps, 'children' | 'tooltipProps'>) {
  return <Button {...props}>Hello, World!</Button>;
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

export function Disabled() {
  return <Button disabled>Hello, World!</Button>;
}

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
