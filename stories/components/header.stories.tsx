import { Header, Toolbar } from '../../src';

export default {
  title: 'Components / Header',
};

export function Basic() {
  return (
    <Header>
      <Toolbar orientation="horizontal">
        <Toolbar.Item titleOrientation="horizontal" id="logo" title="Logo">
          Logo
        </Toolbar.Item>
      </Toolbar>
      <Toolbar orientation="horizontal">
        <Toolbar.Item id="a" title="User manual">
          A
        </Toolbar.Item>
        <Toolbar.Item id="b" title="General settings">
          B
        </Toolbar.Item>
        <Toolbar.Item id="c" title="Full screen">
          C
        </Toolbar.Item>
      </Toolbar>
    </Header>
  );
}
