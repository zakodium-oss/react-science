import { Header, Toolbar } from '../../src/components';

export default {
  title: 'Components / Header',
};

export function Basic() {
  return (
    <Header>
      <Toolbar>
        <Toolbar.Item tooltip="Logo" icon="airplane" />
      </Toolbar>
      <Toolbar>
        <Toolbar.Item tooltip="User manual" icon="manual" />
        <Toolbar.Item tooltip="General settings" icon="cog" />
        <Toolbar.Item tooltip="Full screen" icon="fullscreen" />
      </Toolbar>
    </Header>
  );
}
