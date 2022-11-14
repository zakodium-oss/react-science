import { Header, Toolbar } from '../../src/components/index';

export default {
  title: 'Components / Header',
};

export function Basic() {
  return (
    <Header>
      <Toolbar orientation="horizontal">
        <Toolbar.Item titleOrientation="horizontal" title="Logo">
          Logo
        </Toolbar.Item>
      </Toolbar>
      <Toolbar orientation="horizontal">
        <Toolbar.Item title="User manual">A</Toolbar.Item>
        <Toolbar.Item title="General settings">B</Toolbar.Item>
        <Toolbar.Item title="Full screen">C</Toolbar.Item>
      </Toolbar>
    </Header>
  );
}
