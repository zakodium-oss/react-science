import { Button, ButtonGroup } from '../../src/components/index';

export default {
  title: 'Components / Button',
};

export function Basic() {
  return <Button>Hello, World!</Button>;
}

export function ButtonGroupBasic() {
  return (
    <ButtonGroup>
      <ButtonGroup.Button position="first" label="A" onClick={() => {}} />
      <ButtonGroup.Button position="last" label="B" onClick={() => {}} />
    </ButtonGroup>
  );
}
